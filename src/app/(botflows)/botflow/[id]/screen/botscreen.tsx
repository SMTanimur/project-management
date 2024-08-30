'use client';
import { IBotFlows, useBotFlowsStore } from '@/store/botfllow/botflows';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';



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

import CustomEdge from '@/components/botflows/edges/custom-edge';
import dynamic from 'next/dynamic';
import { useFlow } from '@/hooks';
import { IBotflow } from '@/types/workflow';
import { GetWorkflowById } from '@/hooks/botflow/useGetBotflow';
import { useBotFlow } from '@/hooks/botflow/useBotflow';
import { BotSidebar } from './sidebar';

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
  return (
    <div>
      <div className='flex relative'>
        
        <div className='flex flex-col w-full'>
          <BotHeader botflow={botflow as IBotflow} onSave={onSaveWorkflow} />
             <div className='flex '>

              <div className='mt-10'>
              <BotSidebar />
              </div>
            
             
          <div className=' h-[calc(100vh-78px)] flex-1' ref={reactWorkflowWrapper}>
          
            <ReactFlow
             nodes={nodes}
             nodeTypes={nodeTypes as any}
             onNodesChange={onNodesChange}
             edges={edges}
             onEdgesChange={onEdgesChange}
             onConnect={onConnect}
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
    </div>
  );
};

