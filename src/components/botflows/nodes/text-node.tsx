import { Handle, Position } from 'reactflow';
import { BaseLayout } from './base';
import React from 'react';
import { cn } from '@/lib/utils';
import { IBotNodeData } from '@/types';
import { HandleClickMenu } from '../shared/handle-cllick-menu';

export const TextNode = (node: IBotNodeData) => {
  return (
    <div className='relative'>
      <BaseLayout {...{ node }}>
       
      </BaseLayout>
      <Handle type='target' position={Position.Left} id='a' isConnectable />
      <Handle
        type='source'
        position={Position.Right}
        id='b'
        isConnectable
        className='z-50 -right-5 absolute grid place-items-center w-[45px] h-[45px]'
      >
        <HandleClickMenu />
      </Handle>
    </div>
  );
};
