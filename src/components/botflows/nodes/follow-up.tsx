import { Handle, Position } from 'reactflow';
import { BaseLayout } from './base';
import React from 'react';
import { IBotNodeData } from '@/types';
import { HandleClickMenu } from '../shared/handle-cllick-menu';

export const FollowUpNode = (node: IBotNodeData) => {
  return (
    <div className='relative'>
      <BaseLayout {...{ node }}>
        <div className='flex flex-col items-center justify-center gap-2 bg-gray-200  px-2 py-5 '>
        
        </div>
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
