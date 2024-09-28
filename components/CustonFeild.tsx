import React, { ReactNode } from 'react'
import 'react-phone-number-input/style.css'
import 'react-datepicker/dist/react-datepicker.css'
import PhoneInput from 'react-phone-number-input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import DatePicker from 'react-datepicker'
import type { GetProps } from 'antd'
import dayjs from 'dayjs'
import { Control } from 'react-hook-form'
import { Input } from './ui/input'
import { FormFeildType } from './forms/PatientForm'
import Image from 'next/image'
import { E164Number } from 'libphonenumber-js/core'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import ReactDatePicker from 'react-datepicker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from './ui/select'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'
interface Customprops {
  control: Control<any>
  feildType: FormFeildType
  name: string
  label?: string
  placeholder?: string
  iconSrc?: string
  iconAlt?: string
  disabled?: boolean
  dateFormat?: string
  showTimeSelect?: boolean
  children?: React.ReactNode
  className?: string
  renderSkeleton?: (feild: any) => React.ReactNode
}

const RenderFeild = ({ field, props }: { field: any; props: Customprops }) => {
  const { feildType, placeholder, iconAlt, iconSrc, renderSkeleton, dateFormat } = props

  switch (feildType) {
    case FormFeildType.INPUT:
      return (
        <div className='flex rounded-md  border border-dark-500 bg-dark-400'>
          {iconSrc && (
            <Image src={iconSrc} alt={iconAlt || 'icon'} width={24} height={24} className='ml-2' />
          )}
          <FormControl>
            <Input {...field} placeholder={placeholder} className='shad-input border-0 w-full' />
          </FormControl>
        </div>
      )
      break
    case FormFeildType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry='US'
            placeholder={placeholder}
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            international
            withCountryCallingCode
            className='input-phone w-full'
          />
        </FormControl>
      )
    case FormFeildType.DATE_PICKER:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          <Image
            src='/assets/icons/calendar.svg'
            height={24}
            width={24}
            alt='user'
            className='ml-2'
          />
          <FormControl>
            <DatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value}
              onChange={date => field.onChange(date)}
              timeInputLabel='Time:'
              dateFormat={props.dateFormat ?? 'MM/dd/yyyy'}
              wrapperClassName='date-picker'
            />
          </FormControl>
        </div>
      )
    case FormFeildType.SKELETON:
      return renderSkeleton && renderSkeleton(field)
    case FormFeildType.SELECT:
      return (
        <FormControl className='border-dark-500 py-2'>
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className='w-full border-dark-500 bg-dark-400 '>
              <SelectValue placeholder={placeholder} className='py-2' />
            </SelectTrigger>
            <SelectContent className='border-dark-500  bg-dark-400  '>
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      )
    case FormFeildType.TEXTAREA:
      return (
        <div className='flex rounded-md  border border-dark-500     bg-dark-400'>
          <FormControl className=' py-2'>
            <Textarea
              {...field}
              placeholder='Type your message here.'
              className=' shad-textArea w-full text-sm'
            />
          </FormControl>
        </div>
      )
    case FormFeildType.CHECKBOX:
      return (
        <FormControl>
          <div className='flex items-center gap-4'>
            <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} />
            <FormLabel htmlFor={props.name} className='checkbox-label'>
              {props.label}
            </FormLabel>
          </div>
        </FormControl>
      )
    default:
      break
  }
}
const CustomFeild = (props: Customprops) => {
  const { control, feildType, label, name } = props
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full'>
          {feildType !== FormFeildType.CHECKBOX && label && (
            <FormLabel className='shad-input-label'>{label}</FormLabel>
          )}
          <RenderFeild field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CustomFeild
