import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.action'
import { SearchParamProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId) 

  return (
    <div className='flex h-screen max-h-screen '>
      {/* //  TODO:  OTP Verification | PasskeyModal */}
      <section className='remove-scrollbar container my-auto h-screen overflow-y-scroll'>
        <div className='sub-container max-w-[860px] '>
          <Image
            src={'/assets/icons/logo-full.svg'}
            height={1000}
            width={1000}
            alt='patient'
            className='mb-12 h-10 w-fit'
          />
          <RegisterForm user={user} />

          <div className='text-14-regular mt-10 flex justify-start'>
            <p className='justify-items-end text-dark-600 xl:text-left'>&copy; 2024 CarePulse</p>
          </div>
        </div>
      </section>
      <Image
        alt='patient'
        height={1000}
        width={1000}
        src={'/assets/images/register-img.png'}
        className='side-img max-w-[390px] h-screen'
      />
    </div>
  )
}

export default Register
