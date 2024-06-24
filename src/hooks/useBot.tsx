"use client";

import { nanoid } from "nanoid";
import {
  DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Edge,
  MarkerType,
  Node,
  ReactFlowInstance,
  addEdge,
  getConnectedEdges,

  useReactFlow,
} from "reactflow";






export const useFlow = () => {

  const { getNode, getEdges, getNodes, setNodes, setEdges} = useReactFlow();

  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);



  const nodeTypes = useMemo(() => {
    return {
      
    }
  }, []);



  const onConnect = useCallback(
    (params: any) => {
      if (params.source === params.target) return;
      const prevNode: any = getNode(params.source);
      const getConnectedEdge = getConnectedEdges([prevNode], getEdges());

      const addNewEdge: Edge = {
        id: nanoid(10),
        source: params.source,
        target: params.target,
        type: "bridge",
        labelBgBorderRadius: 4,
      };

      if (prevNode?.type === "conditionalSplit") {
        const existYes = getConnectedEdge.findIndex((n) => n.label === "Yes");
        if (existYes === -1) {
          Object.assign(addNewEdge, { label: "Yes" });
        } else {
          Object.assign(addNewEdge, { label: "No" });
        }

        const existingYesNoEdges = getConnectedEdge.filter(
          (el) => el?.label === "Yes" || el?.label === "No"
        );
        if (existingYesNoEdges.length === 2) return;
      }

      setEdges((eds: Edge[]) => addEdge({ ...addNewEdge }, eds));
    },
    [setEdges]
  );



  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      const reactFlowBounds: any = reactFlowWrapper?.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow/type");
      const label = event.dataTransfer.getData("application/reactflow/label");

      const targetId = event.target.closest(".react-flow__node")?.getAttribute("data-id");

      if (typeof type === "undefined" || !type || !reactFlowBounds) return;

      const position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      if (!position) return;


      const newNode = {
        id: nanoid(),
        type,
        position,
        data: { label },
      };

      if (targetId && newNode.id) {
        const addNewEdge: Edge = {
          id: nanoid(),
          source: targetId,
          target: newNode.id,
          
          style: { stroke: "black", strokeWidth: "1.3" },
          labelBgBorderRadius: 4,
          animated: true,
          markerEnd: { type: MarkerType.ArrowClosed, color: "black" },
        };
        setEdges((nds: Edge[]) => nds.concat(addNewEdge));
      }

      setNodes((nds: Node[]) => nds.concat(newNode));
    },
    [reactFlowInstance, setEdges, setNodes]
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

 
  return {
    nodeTypes,
    reactFlowWrapper,
    setNodes,
    setEdges,
    onConnect,
    onDrop,
    onDragOver,
    setReactFlowInstance,
  };
};