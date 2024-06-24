'use client';
import { useBotFlowsStore } from '@/store/botfllow/botflows';
import { useParams } from 'next/navigation';
import React from 'react';
import BotSidebar from './sidbar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { ChevronRight, HomeIcon } from 'lucide-react';
import BotHeader from './bot-header';
import { useEdgesState, useNodesState } from 'reactflow';

const BotScreen = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const { getBotflowById } = useBotFlowsStore();
  const botflow = getBotflowById(id);
  const [nodes, setNodes, onNodesChange] = useNodesState(botflow?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(botflow?.edges || [])

   return(
    <div>
      <div className='flex '>
        <BotSidebar />
      <BotHeader/>
       
      </div>
      <div className=''>

</div>
    </div>
  );
};

export default BotScreen;
