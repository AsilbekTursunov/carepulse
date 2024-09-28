'use server'
import { database, messeging } from '../appwrite.config'
import { ID, Query } from 'node-appwrite'
import { formatDateTime, parseStringify } from '../utils'
import { Appointment } from '@/types/appwritet.type'
import { CreateAppointmentParams, UpdateAppointmentParams } from '@/types'
import { revalidatePath } from 'next/cache'

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  // Call your API to create an appointment here
  try {
    const newAppointment = await database.createDocument(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    )

    return parseStringify(newAppointment)
  } catch (error) {
    console.log('createAppointment api error: ' + error)
  }
}

export const getAppointment = async (appointmentId: string) => {
  // Call your API to get all appointments here
  try {
    const appointments = await database.getDocument(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      appointmentId
    )
    return parseStringify(appointments)
  } catch (error) {
    console.log('getAppointment error: ' + error)
  }
}

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    // https://appwrite.io/docs/references/1.5.x/server-nodejs/messaging#createSms
    const message = await messeging.createSms(ID.unique(), content, [], [userId])
    return parseStringify(message)
  } catch (error) {
    console.error('An error occurred while sending sms:', error)
  }
}

export const updateAppointment = async ({
  appointmentId,
  appointment,
  type,
  userId,
}: UpdateAppointmentParams) => {
  // Call your API to update an appointment here
  try {
    const updatedAppointment = await database.updateDocument(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    )

    if (!updatedAppointment) throw Error
    const smsMessage = `Greetings from CarePulse. ${
      type === 'schedule'
        ? `Your appointment is confirmed for ${
            formatDateTime(appointment.schedule!).dateTime
          } with Dr. ${appointment.primaryPhysician}`
        : `We regret to inform that your appointment for ${
            formatDateTime(appointment.schedule!).dateTime
          } is cancelled. Reason:  ${appointment.cancellationReason}`
    }.`
    await sendSMSNotification(userId, smsMessage)

    revalidatePath('/admin')
    return parseStringify(updatedAppointment)
  } catch (error) {
    console.log('createAppointment api error: ' + error)
  }
}

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await database.listDocuments(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!
      // [Query.orderDesc('$createdAt')]
    )

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    }

    const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
      switch (appointment.status) {
        case 'scheduled':
          acc.scheduledCount++
          break
        case 'pending':
          acc.pendingCount++
          break
        case 'cancelled':
          acc.cancelledCount++
          break
      }
      return acc
    }, initialCounts)

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    }

    return parseStringify(data)
  } catch (error) {
    console.error('An error occurred while retrieving the recent appointments:', error)
  }
}
