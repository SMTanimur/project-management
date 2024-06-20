import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { ChevronRight, HomeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const BotHeader = () => {
  return (
    <div className='flex py-3 px-6 bg-white sticky top-0 w-full items-center justify-between border-b h-[calc(53px+1.30rem)] z-50'>
      <Breadcrumb className='ml-3'>
            <BreadcrumbList className='flex items-center'>
              <BreadcrumbItem className='text-xl'>
                <HomeIcon className='size-5' />
                <BreadcrumbLink asChild>
                  <Link href='/botflows'>Botflows</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <ChevronRight className='size-5' />
              <h4>Botflow</h4>
              {/* ... */}
            </BreadcrumbList>
          </Breadcrumb>
    </div>
  )
}

export default BotHeader
