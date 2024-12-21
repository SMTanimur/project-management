
import { useReactFlow } from "@xyflow/react";
import { cloneDeep } from "lodash";


interface UpdateProps {
  id: string;
  index?: number;
  type?: string;
  data: Record<string, any>;
}

export const useNodeDataChange = () => {
  const { setNodes } = useReactFlow();


  const updateNodeData = ({ id, index, type, data }: UpdateProps) => {
    if (!id) return;
    setNodes((prev) => {
      const nodes = cloneDeep(prev);
      nodes.map((node) => {
        if (node.id === id) {
          if (type) {
           
          Object.assign((node.data as Record<string, any>)[type][index!], data);
          

          } else {
            Object.assign(node.data, data);
          }
        }
        return node;
      });
      return nodes;
    });
  };

  return {
    updateNodeData,
  };
};

