"use client"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { IBotFlows } from '@/store/botfllow';
import { IBotflow } from '@/types/workflow';

import { ChevronRight, HomeIcon, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type BotProps = {
  botflow: IBotflow
  onSave: () => void;
};
const BotHeader = ({ botflow,onSave }: BotProps) => {
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
          <h4 className='text-xl '>Botflow</h4>
          {/* ... */}
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1>{botflow?.name}</h1>
      </div>
      <div className='flex items-center gap-2'>
        <Button variant={'outline'} className='flex gap-1 items-center'>
          <Plus size={16} />
          <span>New Bot</span>
        </Button>
        <Button size={'lg'} className='rounded-xl' onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default BotHeader;
