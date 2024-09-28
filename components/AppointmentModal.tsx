'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Appointment } from '@/types/appwritet.type'
import { Button } from './ui/button'
import AppointmentForm from './forms/Appointment'
import { useState } from 'react'

interface IAppointmentModal {
  // Add your props here
  type: 'schedule' | 'cancel'
  patientId: string
  userId: string
  appointment: Appointment
  title: string
  description: string
}

const AppointmentModal = ({ type, patientId, userId, appointment }: IAppointmentModal) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='flex gap-3 items-center justify-start'>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className={`capitalize ${type === 'schedule' && 'text-green-500'}`}>
          <Button>{type}</Button>
        </DialogTrigger>
        <DialogContent className='shad-dialog sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='capitalize'>{type} Appointment</DialogTitle>
            <DialogDescription>
              Please fill in the following details to {type} appointment
            </DialogDescription>
          </DialogHeader>
          <AppointmentForm
            userId={userId}
            patientId={patientId}
            type={type}
            appointment={appointment}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AppointmentModal
