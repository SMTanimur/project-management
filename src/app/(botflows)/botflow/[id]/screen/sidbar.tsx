"use client"
import { cn } from '@/lib'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import React from 'react'

const BotSidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <div
    className={cn('bg-gray-50 py-5 h-screen sticky top-0 ' , collapsed ? 'px-5 ' : "max-w-[250px] w-full")}
    >
      <div className='flex items-center pb-5 border-b px-3 justify-between'>
         <h3 className={cn(collapsed ? 'hidden' : 'block')}>SMTR</h3>

         <button className='size-8 grid place-content-center'
         onClick={()=>setCollapsed(!collapsed)}
         >
           {collapsed ? <ChevronsRight/> : <ChevronsLeft />}
         </button>
      </div>

      <div>
        
      </div>
      
    </div>
  )
}

export default BotSidebar
