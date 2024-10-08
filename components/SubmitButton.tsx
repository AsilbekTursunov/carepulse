import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
interface ButtonPorps {
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}
const SubmitButton = ({ isLoading, className, children }: ButtonPorps) => {
  return (
    <Button disabled={isLoading} className={className ?? 'shad-primary-btn w-full'}>
      {isLoading ? (
        <div className='flex items-center justify-center'>
          <Image
            src={'/assets/icons/loader.svg'}
            alt='loader'
            height={24}
            width={24}
            className='animate-spin'
          />
          <span className='ml-4'>Loading...</span>
        </div>
      ) : (
        children
      )}
    </Button>
  )
}

export default SubmitButton
