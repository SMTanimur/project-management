import { nanoid } from 'nanoid';
import { DragEvent, useCallback, useMemo, useRef, useState } from 'react';

import { lowerCase } from 'lodash';
import {
  addEdge,
  Edge,
  Node,
  ReactFlowInstance,
  useReactFlow,
} from '@xyflow/react';
import { EdgeType, NodeType } from '@/types';
import { ConditionNode, FileGenarator, GenerativeAI, SendEmailNode, TextToJsonNode, TimerNode, TriggerNode } from '@/components/botflows/nodes';




export const useFlow = () => {
  const { getNodes, setEdges, setNodes } = useReactFlow();

  const initialNodes: Node[] = [
    {
      id: 'Trigger_1',
      type: NodeType.TRIGGER,
      data: {
        icon: 'trigger',
        label: 'Trigger',
      },
      position: { x: 350, y: 200 },
    },
  ];
  const initialEdges: Edge[] = [];
  const reactWorkflowWrapper = useRef<HTMLDivElement | null>(null);
  const [reactWorkflowInstance, setReactWorkflowInstance] =
    useState<ReactFlowInstance | null>(null);

  const [edgeStyleType, setEdgeStyleType] = useState<string>(EdgeType.DEFAULT);

  const nodeTypes = useMemo(() => {
    return {
      trigger: TriggerNode,
      textToJson: TextToJsonNode,
      generativeAi: GenerativeAI,
      fileGenerate: FileGenarator,
      timer: TimerNode,
      condition: ConditionNode,
      sendEmail: SendEmailNode,


    };
  }, []);

  const nodes = getNodes();
  const onConnect = useCallback(
    (params: any) => {
      // if (params.source === params.target) return;
      // const prevNode: any = getNode(params.source);
      // const getConnectedEdge = getConnectedEdges([prevNode], getEdges());
      //gray color

      let newColor = '#dedede'
      const type = 'bezier';
      const addNewEdge: Edge = {
        id: nanoid(),
        source: params.source,
        target: params.target,
        animated:true,
        style: { stroke: newColor, strokeWidth: '3px' },
        type,
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
    
    let newColor = '#dedede';
    const newNode: Node = {
      id: newNodeId,
      data: { label: item.label, icon: item.icon},
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
      const reactWorkflowBounds =
        reactWorkflowWrapper?.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow/type');
      const label = event.dataTransfer.getData('application/reactflow/label');
      const icon = event.dataTransfer.getData('application/reactflow/icon');
      const description = event.dataTransfer.getData(
        'application/reactflow/description'
      );

    

    
      if (typeof type === 'undefined' || !type || !reactWorkflowBounds) return;

      const position = reactWorkflowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      if (!position) return;

      const newNode = {
        id: nanoid(),
        type,
        position,
        data: { label, icon, description},
      };

      setNodes((nds: Node[]) => nds.concat(newNode));
    },
    [reactWorkflowInstance, setEdges, setNodes]
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeDeleteClick = (nodeId: string) => {
    setNodes(nds => nds.filter(node => node.id !== nodeId));
    setEdges(eds =>
      eds.filter(edge => edge.source !== nodeId && edge.target !== nodeId)
    );
  };

  const onNodeDuplicate = (nodeId: string) => {
    const nodeToDuplicate = nodes.find(node => node.id === nodeId);
    if (!nodeToDuplicate) return;

    const newNodeId = nanoid();
    const newNode: Node = {
      ...nodeToDuplicate,
      id: newNodeId,
      data: { ...nodeToDuplicate.data }, // Deep copy of data to ensure independence
      position: {
        x: nodeToDuplicate.position.x + 50,
        y: nodeToDuplicate.position.y + 50,
      },
      selected: false,
    };

    setNodes(nds => nds.concat(newNode));


  };

  return {
    nodeTypes,
    reactWorkflowWrapper,
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
    setReactWorkflowInstance,
    onNodeDeleteClick,
    onNodeDuplicate,
  };
};
