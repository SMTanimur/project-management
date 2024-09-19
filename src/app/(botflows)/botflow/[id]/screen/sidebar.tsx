"use client"
import { Card } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { sidebarNavigation } from '@/configs'
import { cn } from '@/lib'
import { camelCase } from 'lodash'
import { ChevronsLeft, ChevronsRight, Grip } from 'lucide-react'
import React, { DragEvent } from 'react'

interface NodeData {
  label: string;
  type: string;
  icon: string;
  description?: string;
}
export const BotSidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false)

  const onDragStart = (
    e: DragEvent<HTMLDivElement>,
    data: NodeData,
    targetId?: string
  ) => {
    e.dataTransfer.setData(`application/reactflow/label`, data.label);
    e.dataTransfer.setData(`application/reactflow/type`, camelCase(data.type));
    e.dataTransfer.setData(`application/reactflow/icon`, data.icon);
    if (data.description) e.dataTransfer.setData(`application/reactflow/description`, data.description);
    if (targetId) e.dataTransfer.setData('targetId', targetId);
  };

  return (
    <Card
    className={cn(
      'bg-white h-[77vh] py-3 px-0 rounded-lg shadow-lg',
      collapsed ? 'px-2 ' : 'max-w-[300px] w-full'
    )}
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
      <ScrollArea className="h-[calc(100vh-290px)] pr-2 py-3 w-full ">
        <div className={cn('flex flex-col overflow-y-auto', collapsed ? "px-2 justify-center items-center" : "px-6")}>
          {sidebarNavigation.map((item, index) => (
            <div key={index} className='w-full'>
              <div className='flex flex-col gap-2 w-full'>
                {item.children.map((item, index) => {
                  const Icon = Icons[item.icon ?? "bell"];
                  return (
                    <div
                      key={index}
                      className='mt-1 px-4 py-3 border border-gray-200 rounded-lg flex items-center justify-between gap-4 w-full hover:shadow-lg transition-shadow duration-300 cursor-grab'
                      draggable
                      onDragStart={event =>
                        onDragStart(
                          event,
                          {
                            label: item.label as string,
                            type: item.type as string,
                            icon: item.icon as string,
                            description: item.description,
                          },
                          item.targetId
                        )
                      }
                    >
                      <div className={cn('flex items-center gap-2 w-full', collapsed ? "justify-center" : "justify-between")}>
                        <div
                          className={cn(
                            'px-2 py-1 rounded-md bg-gray-100 flex items-center justify-center',
                          )}
                        >
                          <Icon className='text-gray-500 size-5' />
                        </div>
                        {
                          !collapsed && (
                            <h6
                              className={cn(
                                'text-gray-800 text-sm font-medium flex-1',
                                collapsed ? 'hidden' : 'block'
                              )}
                            >
                              {item.label}
                            </h6>
                          )
                        }
                      </div>
                      <div className={cn(collapsed ? 'hidden' : 'block')}>
                        <Grip size={20} className='text-gray-400' />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
        
      </div>
      
    </Card>
  )
}
