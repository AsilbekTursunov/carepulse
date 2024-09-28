'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form } from '@/components/ui/form'
import CustomFeild from '../CustonFeild'
import SubmitButton from '../SubmitButton'
import { useState } from 'react'
import { UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/actions/patient.action'

export enum FormFeildType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datepicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
  TIME = 'timepicker',
}

const PatientForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)
    try {
      const user = {
        name,
        email,
        phone,
      }

      const newUser = await createUser(user)
      setIsLoading(false)
      if (newUser) router.push(`patients/${newUser.$id}/register`)
    } catch (error) {
      console.log('Patient form error', error)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <section className='mb-12 space-y-4'>
          <h1 className='header'>Hi there 👋</h1>
          <p className='text-dark-700'>Schedule your first appointment</p>
        </section>
        <CustomFeild
          control={form.control}
          feildType={FormFeildType.INPUT}
          name={'name'}
          label={'Full Name'}
          placeholder={'Jone Doe'}
          iconSrc={'/assets/icons/user.svg'}
          iconAlt={'user'}
        />
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
        <SubmitButton isLoading={isLoading} className='bg-green-500 w-full hover:bg-green-500/90'>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm
