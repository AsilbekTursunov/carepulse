'use client'

import { PatientFormValidation, UserFormValidation } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl } from '../ui/form'
import CustomFeild from '../CustonFeild'
import { FormFeildType } from './PatientForm'
import SubmitButton from '../SubmitButton'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Doctors, genderOptions, IdentificationTypes, PatientFormDefaultValues } from '@/constants'
import { Label } from '../ui/label'
import { SelectItem } from '../ui/select'
import Image from 'next/image'
import FileUploader from '../FileUploader'
import { registerPatient } from '@/lib/actions/patient.action'
import { User } from '@/types'

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  })

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true) 

    // Store file info in form data as
    let formData
    if (values.identificationDocumentUrl && values.identificationDocumentUrl?.length > 0) {
      const blobFile = new Blob([values.identificationDocumentUrl[0]], {
        type: values.identificationDocumentUrl[0].type,
      })

      formData = new FormData()
      formData.append('blobFile', blobFile)
      formData.append('fileName', values.identificationDocumentUrl[0].name)
    }
    try {
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocumentUrl ? formData : undefined,
        privacyConsent: values.privacyConsent,
        treatmentConsent: values.treatmentConsent,
        disclosureConsent: values.disclosureConsent,
      }
      const newPatient = await registerPatient(patient)

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`)
      }
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8  '>
        <section className='mb-12 space-y-3 flex-1'>
          <h1 className='header'>Welcome 👋</h1>
          <p className='text-dark-700'>Let us know more about yourself</p>
        </section>
        <section className='  space-y-6  '>
          <div className='space-y-1 mb-9'>
            <h2 className='sub-header'>Personal Information</h2>
          </div>
          <CustomFeild
            control={form.control}
            feildType={FormFeildType.INPUT}
            name={'name'}
            label={'Full Name'}
            placeholder={'Jone Doe'}
            iconSrc={'/assets/icons/user.svg'}
            iconAlt={'user'}
          />
          <div className='flex flex-col gap-6 w-full xl:flex-row '>
            <CustomFeild
              control={form.control}
              feildType={FormFeildType.INPUT}
              name={'email'}
              label={'Email'}
              placeholder={'jonedoe@gmail.com'}
              iconSrc={'/assets/icons/email.svg'}
              iconAlt={'email'}
            />
            <CustomFeild
              control={form.control}
              feildType={FormFeildType.PHONE_INPUT}
              name={'phone'}
              label={'Phone Number'}
              placeholder={'+00 0342 0453 34'}
              iconSrc={'/assets/icons/phone.svg'}
              iconAlt={'phone'}
            />
          </div>
          <div className='flex flex-col gap-6 w-full xl:flex-row '>
            <CustomFeild
              control={form.control}
              feildType={FormFeildType.DATE_PICKER}
              name={'birthDate'}
              label={'Date of Birth'}
              placeholder={'Select your birthday'}
              iconSrc={'/assets/icons/calendar.svg'}
              iconAlt={'calender'}
            />
            <CustomFeild
              control={form.control}
              feildType={FormFeildType.SKELETON}
              name={'gender'}
              label={'Gender'}
              renderSkeleton={field => (
                <FormControl>
                  <RadioGroup
                    className='flex h-11 gap-6 justify-between'
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {genderOptions.map(option => (
                      <div key={option} className='radio-group'>
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className='cursor-pointer text-white'>
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          {/* Address & Occupation */}
          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFeild
              feildType={FormFeildType.INPUT}
              control={form.control}
              name='address'
              label='Address'
              placeholder='14 street, New york, NY - 5101'
            />

            <CustomFeild
              feildType={FormFeildType.INPUT}
              control={form.control}
              name='occupation'
              label='Occupation'
              placeholder=' Software Engineer'
            />
          </div>
          {/* Emergency Contact Name & Emergency Contact Number */}
          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFeild
              feildType={FormFeildType.INPUT}
              control={form.control}
              name='emergencyContactName'
              label='Emergency contact name'
              placeholder="Guardian's name"
            />

            <CustomFeild
              feildType={FormFeildType.PHONE_INPUT}
              control={form.control}
              name='emergencyContactNumber'
              label='Emergency contact number'
              placeholder='(555) 123-4567'
            />
          </div>
        </section>
        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Medical Information</h2>
          </div>
          <CustomFeild
            feildType={FormFeildType.SELECT}
            control={form.control}
            name='primaryPhysician'
            label='Primary care physician'
            placeholder='Select a physician'
          >
            {Doctors.map(doctor => (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className='flex cursor-pointer items-center gap-2'>
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt='doctor'
                    className='rounded-full border border-dark-500'
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFeild>
          {/* INSURANCE & POLICY NUMBER */}
          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFeild
              feildType={FormFeildType.INPUT}
              control={form.control}
              name='insuranceProvider'
              label='Insurance provider'
              placeholder='BlueCross BlueShield'
            />

            <CustomFeild
              feildType={FormFeildType.INPUT}
              control={form.control}
              name='insurancePolicyNumber'
              label='Insurance policy number'
              placeholder='ABC123456789'
            />
          </div>
          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFeild
              feildType={FormFeildType.TEXTAREA}
              control={form.control}
              name='allergies'
              label='Allergies (if any)'
              placeholder='Peanuts, Penicillin, Pollen'
            />

            <CustomFeild
              feildType={FormFeildType.TEXTAREA}
              control={form.control}
              name='currentMedication'
              label='Current medications'
              placeholder='Ibuprofen 200mg, Levothyroxine 50mcg'
            />
          </div>
          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFeild
              feildType={FormFeildType.TEXTAREA}
              control={form.control}
              name='familyMedicalHistory'
              label=' Family medical history (if relevant)'
              placeholder='Mother had brain cancer, Father has hypertension'
            />

            <CustomFeild
              feildType={FormFeildType.TEXTAREA}
              control={form.control}
              name='pastMedicalHistory'
              label='Past medical history'
              placeholder='Appendectomy in 2015, Asthma diagnosis in childhood'
            />
          </div>
        </section>
        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Identification and Verfication</h2>
          </div>
          <CustomFeild
            feildType={FormFeildType.SELECT}
            control={form.control}
            name='identificationType'
            label='Identification Type'
            placeholder='Select  identification Type'
          >
            {IdentificationTypes.map(type => (
              <SelectItem key={type} value={type} className='cursor-pointer'>
                {type}
              </SelectItem>
            ))}
          </CustomFeild>
          <CustomFeild
            feildType={FormFeildType.INPUT}
            control={form.control}
            name='identificationNumber'
            label='Identification Number'
            placeholder='ABC123456789'
          />
          <CustomFeild
            control={form.control}
            feildType={FormFeildType.SKELETON}
            name={'identificationDocumentUrl'}
            label={'Scanned Copy of Identification Document'}
            renderSkeleton={field => (
              <FormControl>
                <FileUploader onChange={field.onChange} files={field.value} />
              </FormControl>
            )}
          />
        </section>
        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Consent and Privacy</h2>
          </div>

          <CustomFeild
            feildType={FormFeildType.CHECKBOX}
            control={form.control}
            name='treatmentConsent'
            label='I consent to receive treatment for my health condition.'
          />

          <CustomFeild
            feildType={FormFeildType.CHECKBOX}
            control={form.control}
            name='disclosureConsent'
            label='I consent to the use and disclosure of my health
            information for treatment purposes.'
          />

          <CustomFeild
            feildType={FormFeildType.CHECKBOX}
            control={form.control}
            name='privacyConsent'
            label='I acknowledge that I have reviewed and agree to the
            privacy policy'
          />
        </section>

        <SubmitButton isLoading={isLoading} className='bg-green-500 w-full hover:bg-green-500/90'>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
