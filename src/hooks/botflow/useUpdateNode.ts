
import { cloneDeep } from "lodash";
import { useReactFlow } from "reactflow";

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
           
          Object.assign(node.data[type][index!], data);
          

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

