'use client';
import { IBotFlows, useBotFlowsStore } from '@/store/botfllow/botflows';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import BotSidebar from './sidebar';


const BotHeader = dynamic(() => import('./bot-header'), { ssr: false })
import ReactFlow, {
  Background,
  Controls,
  NodeTypes,
  Panel,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow';

import CustomEdge from '@/components/botflows/edges/custom-edge';
import dynamic from 'next/dynamic';
import { useBot } from '@/hooks';

const BotScreen = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const { getBotflowById } = useBotFlowsStore();
  const botflow = getBotflowById(id);
  const [nodes, setNodes, onNodesChange] = useNodesState(botflow?.nodes || []);
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
      <div className='flex'>
        <BotSidebar />
        <div className='flex flex-col w-full'>
          <BotHeader botflow={botflow as IBotFlows} />
          <div className='w-full h-[calc(100vh-78px)] relative'>
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
              <Background />
              <Panel position={'bottom-left'}>
                <div>dfgdgh</div>
              </Panel>
              <Controls />
            </ReactFlow>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FlowWithProvider() {
  return (
    <ReactFlowProvider>
      <BotScreen />
    </ReactFlowProvider>
  );
}
