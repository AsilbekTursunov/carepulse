'use client'

import React from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Appointment } from '@/types/appwritet.type'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  document?: Appointment
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })
  console.log(data)

  return (
    <div className='data-table'>
      <Table className='shad-table'>
        <TableHeader className=' bg-dark-200 h-[54px] '>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className='  shad-table-row-header '>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className=''>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className='shad-table-row'
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className='border-none'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className='table-actions'>
        <Button
          variant='outline'
          size='sm'
          className='shad-gray-btn'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <Image
            src={'/assets/icons/arrow.svg'}
            alt='left-arrow'
            width={100}
            height={100}
            className='size-5'
          />
        </Button>
        <Button
          variant='outline'
          size='sm'
          className='shad-gray-btn'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <Image
            src={'/assets/icons/arrow.svg'}
            alt='left-arrow'
            width={100}
            height={100}
            className='size-5 rotate-180'
          />
        </Button>
      </div>
    </div>
  )
}
