import { Handle, Position } from 'reactflow';

import { ISelectNode } from 'src/types';
import { BaseLayout } from './base';
import { HandleClickMenu } from '../flow-bot/handle-cllick-menu';

export const StartNode = (node: ISelectNode) => {
  return (
    <div className='relative'>
      <BaseLayout {...{ node }}></BaseLayout>
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
