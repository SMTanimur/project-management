'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import BotSidebar from './sidebar';


const BotHeader = dynamic(() => import('./bot-header'), { ssr: false })
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
} from '@xyflow/react';

import dynamic from 'next/dynamic';
import { useFlow } from '@/hooks';
import { IBotflow } from '@/types';
import { GetWorkflowById } from '@/hooks';
import { useBotFlow } from '@/hooks';
import { ConnectionLine, CustomEdge } from '@/components';
const defaultViewport = { x: 0, y: 0, zoom: 0.6 };

export const BotScreen = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const { data:botflow,isPending } = GetWorkflowById(id)

  const {
    onConnect,
    nodeTypes,
    onDragOver,
    onDrop,
    reactWorkflowWrapper,
    setReactWorkflowInstance,
  } = useFlow();
  const { isUpdating, updateBotflow } = useBotFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState( []);
  const edgeTypes: any = useMemo(
    () => ({
      custom: CustomEdge,
    }),
    []
  );
  useEffect(() => {
    if (botflow && botflow.flow) {
      const initialNodes: any = botflow.flow?.nodes || [];
      const initialEdges: any = botflow.flow?.edges || [];
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, [botflow, setNodes, setEdges]);

  const onInit = (instance:any) => {
    setReactWorkflowInstance(instance as unknown as ReactFlowInstance);
    instance.fitView();
  };

  if (isPending) return <div>Pending...</div>;

  const onSaveWorkflow = async () => {
    updateBotflow({
      _id: botflow?._id as string,
      name: botflow?.name as string,
      flow: { nodes, edges },
    });
  };
  console.log({nodes,edges})
  return (
    <div>
      <div className='flex relative'>
        <BotSidebar />
        <div className='flex flex-col w-full'>
          <BotHeader botflow={botflow as IBotflow} onSave={onSaveWorkflow} isUpdating={isUpdating} />
          <div className=' h-[calc(100vh-78px)] ' ref={reactWorkflowWrapper}>
            <ReactFlow
              nodes={nodes}
              nodeTypes={nodeTypes as any}
              onNodesChange={onNodesChange}
              edges={edges}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              connectionLineComponent={ConnectionLine}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onInit={onInit}
              defaultViewport={defaultViewport}
              edgeTypes={edgeTypes}
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

