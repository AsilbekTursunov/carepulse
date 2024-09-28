'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { decryptKey, encryptKey } from '@/lib/utils'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const PasskeyModal = () => {
  const [open, setOpen] = useState(true)
  const [passkey, setPasskey] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const path = usePathname()

  const encryptedKey =
    typeof window !== 'undefined' ? window.localStorage.getItem('accessKey') : null

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey)
    if (path)
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY!.toString()) {
        setOpen(false)
        router.push('/admin')
      } else {
        setOpen(true)
      }
  }, [encryptedKey, open])

  const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey)

      localStorage.setItem('accessKey', encryptedKey)

      setOpen(false)
    } else {
      setError('Invalid passkey. Please try again.')
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className='shad-alert-dialog'>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-start justify-between'>
            Admin Access Verification
            <Image
              src={'/assets/icons/close.svg'}
              alt='close'
              width={20}
              height={20}
              className='cursor-pointer'
              onClick={() => {
                setOpen(false)
                router.push('/')
              }}
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey verification code:
            <span className='bg-dark-200 border-dark-500 border px-1 rounded-md '>1 1 1 1 1 1</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP maxLength={6} value={passkey} onChange={setPasskey}>
            <InputOTPGroup className='shad-otp'>
              <InputOTPSlot className='shad-otp-slot' index={0} />
              <InputOTPSlot className='shad-otp-slot' index={1} />
              <InputOTPSlot className='shad-otp-slot' index={2} />
              <InputOTPSlot className='shad-otp-slot' index={3} />
              <InputOTPSlot className='shad-otp-slot' index={4} />
              <InputOTPSlot className='shad-otp-slot' index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        {error && <p className='shad-error text-14-regular mt-4 flex justify-center'>{error}</p>}
        <AlertDialogFooter>
          <AlertDialogAction className='shad-primary-btn w-full' onClick={e => validatePasskey(e)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PasskeyModal
