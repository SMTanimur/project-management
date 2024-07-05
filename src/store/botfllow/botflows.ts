
import {  IBotNodeData} from "@/types";
import { Edge, Node } from "reactflow";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IBotFlows {
  id:string
  name: string;
  description:string;
  nodes: IBotNodeData[];
  edges: Edge[];
}


export interface BotFlowsStore {
  botflows:IBotFlows[]
  addBotflows:(botflow:IBotFlows)=>void
  removeflows:(botflow:IBotFlows)=>void
  clearflows:()=>void
  addNode: (flowId: string, node: IBotNodeData) => void;
  getBotflowById: (id: string) => IBotFlows | undefined;
  updateNode: (flowId: string, node: IBotNodeData) => void;
  removeNode: (flowId: string, nodeId: string) => void;
  addEdge: (flowId: string, edge: Edge) => void;
  removeEdge: (flowId: string, edgeId: string) => void;
  updateBotflow: (botflow: IBotFlows) => void;
}

export const useBotFlowsStore = create(
  persist<BotFlowsStore>(
    (set,get) => ({
       botflows:[],
       addBotflows:(botflow:IBotFlows)=>{
        set((state)=>({
          botflows:[...state.botflows,botflow]
        }))
       },
       removeflows:(botflow:IBotFlows)=>{
        set((state)=>({
          botflows:state.botflows.filter((flow)=>flow.id!==botflow.id)
        }))
       },
       updateBotflow: (updatedBotflow: IBotFlows) => {
        set((state) => ({
          botflows: state.botflows.map((flow) =>
            flow.id === updatedBotflow.id ? updatedBotflow : flow
          ),
        }));
      },
       clearflows:()=>{
        set((state)=>({
          botflows:[]
        }))
       },
       getBotflowById: (id: string) => {
        return get().botflows.find((flow) => flow.id === id);
      },
       addNode: (flowId: string, node: IBotNodeData) => {
        set((state) => ({
          botflows: state.botflows.map((flow) =>
            flow.id === flowId ? { ...flow, nodes: [...flow.nodes, node] } : flow
          ),
        }));
      },
      updateNode: (flowId: string, node: IBotNodeData) => {
        set((state) => ({
          botflows: state.botflows.map((flow) =>
            flow.id === flowId
              ? {
                  ...flow,
                  nodes: flow.nodes.map((n) => (n.id === node.id ? node : n)),
                }
              : flow
          ),
        }));
      },
      removeNode: (flowId: string, nodeId: string) => {
        set((state) => ({
          botflows: state.botflows.map((flow) =>
            flow.id === flowId
              ? { ...flow, nodes: flow.nodes.filter((n) => n.id !== nodeId) }
              : flow
          ),
        }));
      },
      addEdge: (flowId: string, edge: Edge) => {
        set((state) => ({
          botflows: state.botflows.map((flow) =>
            flow.id === flowId ? { ...flow, edges: [...flow.edges, edge] } : flow
          ),
        }));
      },
      removeEdge: (flowId: string, edgeId: string) => {
        set((state) => ({
          botflows: state.botflows.map((flow) =>
            flow.id === flowId
              ? { ...flow, edges: flow.edges.filter((e) => e.id !== edgeId) }
              : flow
          ),
        }));
      },
    }),
    { name: "BotFlows-store" }
  )
);
