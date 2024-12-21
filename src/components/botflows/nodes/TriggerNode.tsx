import { Handle, Position } from '@xyflow/react';


import { IBotNodeData } from '@/types';
import { BaseLayout } from './base';


export const TriggerNode = (node: IBotNodeData) => {

  return (
    <div className="relative" >
      <BaseLayout {...{ node }}>

      
      </BaseLayout>
      <Handle type="source" position={Position.Right} style={{ background: '#555', padding: '4px' }} />
    </div>
  );
};


