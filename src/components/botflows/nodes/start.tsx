"use client"
import { BaseLayout } from './base';
import { IBotNodeData } from '@/types';
import { HandleClickMenu } from '../shared/handle-cllick-menu';
import { Handle, Position } from '@xyflow/react';

export const StartNode = (node: IBotNodeData) => {
  return (
    <div className='relative'>
      <BaseLayout {...{ node }}>
  
      </BaseLayout>
      <Handle
        type='source'
        position={Position.Right}
        id='a'
        isConnectable
        className='z-50 -right-5 absolute grid place-items-center w-[45px] h-[45px]'
      >
        <HandleClickMenu />
      </Handle>
    </div>
  );
};
