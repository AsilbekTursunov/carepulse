'use server'
import { ID, Query } from 'node-appwrite'
import { parseStringify } from '../utils'
import { InputFile } from 'node-appwrite/file'
import { database, storage, users } from '../appwrite.config'
import { CreateUserParams, RegisterPatientProps, RegisterUserParams } from '@/types'

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name)

    return parseStringify(newUser)
  } catch (error) {
    if (error) {
      const documents = await users.list([Query.equal('email', user.email)])
      console.error('An error occurred while creating a new user:', error)
      return documents?.users[0]
    }
  }
}

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId)

    return parseStringify(user)
  } catch (error) {
    console.log('Register Error', error)
  }
}

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file
    if (identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBuffer(
          identificationDocument?.get('blobFile') as Blob,
          identificationDocument?.get('fileName') as string
        )

      file = await storage.createFile(process.env.NEXT_PUBLIC_BUCKET_ID!, ID.unique(), inputFile)
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await database.createDocument(
      process.env.DATABASE_ID!,
      process.env.PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file.$id}/view??project=${process.env.PROJECT_ID}`
          : null,
        ...patient,
      }
    )

    return parseStringify(newPatient)
  } catch (error) {
    console.error('An error occurred while creating a new patient:', error)
  }
}

export const getPatient = async (userId: string) => {
  try {
    const patients = await database.listDocuments(
      process.env.DATABASE_ID!,
      process.env.PATIENT_COLLECTION_ID!,
      [Query.equal('userId', userId)]
    )

    return parseStringify(patients.documents[0])
  } catch (error) {
    console.log('getPatient', error)
  }
}
