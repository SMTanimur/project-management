import { OrganizationHeader } from '@/components'
import { useGetOranization } from '@/hooks'
import { useGlobalLocalStateStore } from '@/store'
import { Organization } from '@/types'
import React from 'react'

export const OrganizationSection = () => {
  const {currentOrganizationId}=useGlobalLocalStateStore()
  const {data,isLoading}=useGetOranization(currentOrganizationId as string)
  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-2xl font-bold'>Organization</h1>
      </div>

      <OrganizationHeader {...{ organization: data as Organization }} />
    </div>
  )
}


