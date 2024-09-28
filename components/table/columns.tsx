'use client'

import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import Image from 'next/image'
import { Doctors } from '@/constants'
import { StatusBadge } from '../StatusBadge'
import AppointmentModal from '../AppointmentModal'
import { Appointment, Patient } from '@/types/appwritet.type'

const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: 'ID',
    header: () => <div className='text-center'>ID</div>,
    cell: ({ row }) => {
      return <div className='text-center  font-medium'>{row.index + 1}</div>
    },
  },
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({ row }) => {
      const appoinment = row.original
      return <p className='text-14-medium'>{appoinment?.patient?.name}</p>
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const appoinment = row.original
      const date = moment(appoinment.schedule).format('MMM DD, YYYY')
      return <p className='text-14-medium'>{date}</p>
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const appoinment = row.original
      return (
        <div className='min-w-[115px]'>
          <StatusBadge status={appoinment.status} />
        </div>
      )
    },
  },
  {
    accessorKey: 'primaryPhysician',
    header: 'Doctor',
    cell: ({ row }) => {
      const appoinment = row.original
      const doctor = Doctors.find(item => {
        if (item.name == appoinment.primaryPhysician) {
          return item
        }
      })

      if (doctor) {
        return (
          <p className='text-14-medium flex items-center gap-2'>
            <Image
              src={doctor.image}
              alt='correct'
              width={100}
              height={100}
              className='size-10 rounded-full'
            />
            {doctor.name}
          </p>
        )
      } else {
        return <p className='text-14-medium'>Not assigned</p>
      }
    },
  },
  {
    id: 'actions',
    accessorKey: 'schedule',
    header: 'Action',
    cell: ({ row }) => {
      const appointment = row.original

      return (
        <div className='flex items-center gap-2'>
          <AppointmentModal
            patientId={appointment.$id}
            userId={appointment.userId}
            appointment={appointment}
            type='schedule'
            title='Schedule Appointment'
            description='Please confirm the following details to schedule.'
          />
          <AppointmentModal
            patientId={appointment.$id}
            userId={appointment.userId}
            appointment={appointment}
            type='cancel'
            title='Cancel Appointment'
            description='Are you sure you want to cancel your appointment?'
          />
        </div>
      )
    },
  },
]

export default columns
