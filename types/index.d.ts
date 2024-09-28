/* eslint-disable no-unused-vars */
import { Modals } from 'node-appwrite'
export type SearchParamProps = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export type Gender = 'male' | 'female' | 'other'
export type Status = 'pending' | 'scheduled' | 'cancelled'

export interface CreateUserParams {
  name: string
  email: string
  phone: string
}
export interface User extends CreateUserParams {
  $id: string
}

export interface RegisterUserParams extends CreateUserParams {
  userId: string
  birthDate: Date
  gender: Gender
  address: string
  occupation: string
  emergencyContactName: string
  emergencyContactNumber: string
  primaryPhysician: string
  insuranceProvider: string
  insurancePolicyNumber: string
  allergies: string | undefined
  currentMedication: string | undefined
  familyMedicalHistory: string | undefined
  pastMedicalHistory: string | undefined
  identificationType: string | undefined
  identificationNumber: string | undefined
  identificationDocument: FormData | undefined
  privacyConsent: boolean
  treatmentConsent: boolean
  disclosureConsent: boolean
}

export type CreateAppointmentParams = {
  userId: string
  patient: string
  primaryPhysician: string
  reason: string
  schedule: Date
  status: Status
  note: string | undefined
}

export type UpdateAppointmentParams = {
  appointmentId: string
  userId: string
  appointment: Appointment
  type: string
}

export interface RegisterPatientProps {
  name?: string
  email?: string
  phone?: string
  birthDate?: Date
  gender?: string | Gender
  address?: string
  occupation?: string
  emergencyContactName?: string
  emergencyContactNumber?: string
  primaryPhysician?: string
  insuranceProvider?: string
  insurancePolicyNumber?: string
  allergies?: string | undefined
  currentMedication?: string | undefined
  familyMedicalHistory?: string | undefined
  pastMedicalHistory?: string | undefined
  identificationType?: string | undefined
  identificationNumber?: string | undefined
  identificationDocument?: FormData | undefined
  privacyConsent?: boolean
  treatmentConsent?: boolean
  disclosureConsent?: boolean
}

export interface IDataPatients {
  schedule: string
  reason: string
  primaryPhysician: string
  status: string
  userId: string
  cancellationReason: null
  note: string
  patient: IDataUsers[]
}

export interface IDataUsers extends Modals.Documents {
  email: string
  phone: string
  userId: string
  name: string
  privacyConsent: boolean
  gender: string
  birthDate: string
  address: string
  occupation: string
  emergencyContactName: string
  emergencyContactNumber: string
  insuranceProvider: string
  insurancePolicyNumber: string
  allergies: string
  currentMedication: string
  familyMedicalHistory: string
  pastMedicalHistory: string
  identificationType: string
  identificationNumber: string
  identificationDocumentId: string | null
  identificationDocumentUrl: string | null
  primaryPhysician: string
  treatmentConsent: boolean
  disclosureConsent: boolean
  $id: string
}
