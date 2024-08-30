import { Handle, Position } from '@xyflow/react';
import { BaseLayout } from './base';


export const GenerativeAI = (node: any) => {


  return (
    <div className="relative" >
       <BaseLayout {...{ node }}/>
      
     
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
    </div>
  );
};