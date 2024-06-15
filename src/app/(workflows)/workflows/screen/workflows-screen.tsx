'use client';

import { Card } from '@/components/ui/card';
import { getWorkflows } from '@/hooks/workflow/workflow';
import { useGlobalModalStateStore } from '@/store/modal';


import React  from 'react';

const WorkflowsScreen = () => {
  const workflows = getWorkflows();


  const {onOpenModal}=useGlobalModalStateStore()
  
  return (
    <div className='grid content-start grid-cols-1 gap-4 px-12 pt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grow shrink-0'>
      <Card className='relative col-span-1 flex flex-col justify-between min-h-[160px] bg-gray-200 rounded-xl border-[0.5px] border-black/5 cursor-pointer'
      onClick={()=>onOpenModal()}
      
      >
        <div className='grow p-2 rounded-t-xl'>
          <div className='px-6 pt-2 pb-1 text-xs font-medium leading-[18px] text-gray-500'>
            CREATE APP
          </div>

          <h2 className='px-6 pt-2'> Create a blank workflow</h2>
        </div>
      </Card>
      {workflows?.data?.map(workflow => (
        <React.Fragment key={workflow._id}>
          <Card className='group flex col-span-1 bg-white border-2  rounded-xl shadow-sm min-h-[160px]  flex-col transition-all duration-200 ease-in-out cursor-pointer hover:shadow-lg'>
            <div className='flex pt-[14px] px-[14px] pb-3 h-[66px] items-center gap-3 grow-0 shrink-0'>
              <div className='relative shrink-0'>
                <span>🤖</span>
                <span className='absolute bottom-[-3px] right-[-3px] w-4 h-4 p-0.5 bg-white rounded border-[0.5px] border-[rgba(0,0,0,0.02)] shadow-sm'>
                  <svg
                    width='13'
                    height='12'
                    viewBox='0 0 13 12'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-3 h-3 text-[#f79009]'
                    data-icon='Route'
                    aria-hidden='true'
                  >
                    <g id='route-sep'>
                      <path
                        id='Icon'
                        d='M6.08303 2.5H6.30023C7.82386 2.5 8.58567 2.5 8.87485 2.77364C9.12483 3.01018 9.23561 3.35864 9.16812 3.69611C9.09004 4.08651 8.46809 4.52643 7.22418 5.40627L5.19189 6.84373C3.94799 7.72357 3.32603 8.16349 3.24795 8.55389C3.18046 8.89136 3.29124 9.23982 3.54122 9.47636C3.8304 9.75 4.59221 9.75 6.11584 9.75H6.58303'
                        stroke='currentColor'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      ></path>
                      <path
                        id='Icon_2'
                        d='M2.83301 4C3.66143 4 4.33301 3.32843 4.33301 2.5C4.33301 1.67157 3.66143 1 2.83301 1C2.00458 1 1.33301 1.67157 1.33301 2.5C1.33301 3.32843 2.00458 4 2.83301 4Z'
                        fill='currentColor'
                      ></path>
                      <path
                        id='Icon_3'
                        d='M9.83301 11C10.6614 11 11.333 10.3284 11.333 9.5C11.333 8.67157 10.6614 8 9.83301 8C9.00458 8 8.33301 8.67157 8.33301 9.5C8.33301 10.3284 9.00458 11 9.83301 11Z'
                        fill='currentColor'
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>

              <div className='grow w-0 py-[1px]'>
                <div className='flex items-center text-sm leading-5 font-semibold text-gray-800'>
                  <h3 className='truncate'>{workflow.name}</h3>
                </div>
              </div>
            </div>
          </Card>
        </React.Fragment>
      ))}
      
    </div>
  );
};

export default WorkflowsScreen;
