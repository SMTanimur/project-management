import { nanoid } from 'nanoid';
import { DragEvent, useCallback,  useMemo, useRef, useState } from 'react';


import { EdgeType, NodeType } from '@/types';

import { lowerCase } from 'lodash';
import { FollowUpNode, MessageNode, StartNode, TextNode } from '@/components/botflows/nodes';
import { addEdge, Edge, Node, ReactFlowInstance, useReactFlow } from '@xyflow/react';


const initialNodes: Node[] = [
  {
    id: 'start_1',
    type: NodeType.START,
    data: {
      icon: 'flag',
      label: 'Starting Point',
      description: 'where you bot begins',
    },
    position: { x: 350, y: 200 },
  },
];
const initialEdges: Edge[] = [];

export const useBot = () => {
  const {  getNodes, setEdges, setNodes } = useReactFlow();

  const reactBotWrapper = useRef<HTMLDivElement | null>(null);
  const [reactBotInstance, setReactBotInstance] =
  useState<ReactFlowInstance | null>(null);

  const [edgeStyleType, setEdgeStyleType] = useState<string>(EdgeType.DEFAULT);

  const nodeTypes = useMemo(() => {
    return {
      start: StartNode,
      text: TextNode,
      message: MessageNode,
      followUp: FollowUpNode,
    };
  }, []);

  const nodes = getNodes();
  const onConnect = useCallback(
    (params: any) => {
      // if (params.source === params.target) return;
      // const prevNode: any = getNode(params.source);
      // const getConnectedEdge = getConnectedEdges([prevNode], getEdges());
      let newColor = '#7A28FF';
      const type = 'smoothstep';
      const addNewEdge: Edge = {
        id: nanoid(),
        source: params.source,
        target: params.target,
        style: { stroke: newColor, strokeWidth: '4px' },
        type
       
      };

    

      setEdges((eds: Edge[]) => addEdge({ ...addNewEdge }, eds));
    },
    [setEdges, edgeStyleType]
  );

 

  function constructEdge(
    id: any,
    source: any,
    target: any,
    newColor: any,
    type: any
  ) {
    const edge = {
      id,
      type,
      source,
      target,
      style: { stroke: newColor, strokeWidth: '4px' },
      data: { label: '' },
    };
    console.log({ edge });
    return edge;
  }

  const addNodeClick = (item: any, currentId: string) => {
    const filteredNode: any = nodes.find(node => node.id === currentId);
    const newNodeId = nanoid();
    let newColor = '#7A28FF';
    const newNode: any = {
      id: newNodeId,
      data: { label: item.label, icon: item.icon },
      position: {
        x: filteredNode?.position?.x + 400,
        y: filteredNode?.position?.y,
      },
      type: lowerCase(item.label),
    };
    const type = 'smoothstep';
    const newEdge: Edge = constructEdge(
      nanoid(),
      currentId,
      newNodeId,
      newColor,
      type
    );

    setNodes(prev => prev.concat(newNode));
    setEdges(prev => prev.concat(newEdge as Edge));
  };
 
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const reactBotBounds = reactBotWrapper?.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow/type');
      const label = event.dataTransfer.getData('application/reactflow/label');
      const icon = event.dataTransfer.getData('application/reactflow/icon');
      const description = event.dataTransfer.getData('application/reactflow/description');
      if (typeof type === 'undefined' || !type || !reactBotBounds) return;

      const position = reactBotInstance?.screenToFlowPosition({
        x: event.clientX - reactBotBounds.left,
        y: event.clientY - reactBotBounds.top,
      });

      if (!position) return;

     
      const newNode = {
        id: nanoid(),
        type,
        position,
        data: { label, icon, description },
      };


      setNodes((nds: Node[]) => nds.concat(newNode));
    },
    [reactBotInstance, setEdges, setNodes]
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);


  return {
    nodeTypes,
    reactBotWrapper,
    edgeStyleType,
    setNodes,
    setEdges,
    onConnect,
    initialEdges,
    initialNodes,
    setEdgeStyleType,
    addNodeClick,
    onDrop,
    onDragOver,
    setReactBotInstance
  };
};
