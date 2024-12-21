import { Handle, Position } from '@xyflow/react';
import { BaseLayout } from './base';


export const TimerNode = (node: any) => {


  return (
    <div className="relative" >
       <BaseLayout {...{ node }}/>
       
     
     
      <Handle type="target" position={Position.Left} style={{ background: '#555' ,padding: '4px'}} />
      <Handle type="source" position={Position.Right} style={{ background: '#555' ,padding: '4px'}} />
    </div>
  );
};