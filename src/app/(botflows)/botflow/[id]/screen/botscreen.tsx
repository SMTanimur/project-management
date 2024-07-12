'use client';
import { IBotFlows, useBotFlowsStore } from '@/store/botfllow/botflows';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import BotSidebar from './sidebar';


const BotHeader = dynamic(() => import('./bot-header'), { ssr: false })
import {
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type FitViewOptions,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnNodeDrag,
  type NodeTypes,
  type DefaultEdgeOptions,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';

import CustomEdge from '@/components/botflows/edges/custom-edge';
import dynamic from 'next/dynamic';
import { useBot } from '@/hooks';

export const BotScreen = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const { getBotflowById } = useBotFlowsStore();
  const botflow = getBotflowById(id);
  console.log({botflow})
  const [nodes, setNodes, onNodesChange] = useNodesState(botflow?.nodes.map(node => ({ ...node,  data: node.data as unknown as Record<string, unknown> })) || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(botflow?.edges || []);
  const edgeTypes: any = useMemo(
    () => ({
      custom: CustomEdge,
    }),
    []
  );
  const { nodeTypes, onConnect, onDragOver } = useBot();
  return (
    <div>
      <div className='flex relative'>
        <BotSidebar />
        <div className='flex flex-col w-full'>
          <BotHeader botflow={botflow as IBotFlows} />
          <div className=' h-[calc(100vh-78px)] '>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              fitView
              onConnect={onConnect}
              nodeTypes={nodeTypes as any}
              edgeTypes={edgeTypes}
              maxZoom={10}
              minZoom={0.1}
            >
            
             
              <Background/>
              <Controls/>
              <MiniMap position='bottom-right'/>
             
            </ReactFlow>
          
          </div>
        </div>
      </div>
    </div>
  );
};

