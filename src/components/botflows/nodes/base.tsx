import { PropsWithChildren } from 'react';




import { Icons } from '@/components/ui/icons';
import { IBotNodeData } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { useBotPropertyStore } from '@/store/botfllow';

interface BaseLayoutProps extends PropsWithChildren {
  node: IBotNodeData
}

export const BaseLayout = ({ children, node }: BaseLayoutProps) => {
  const { data,selected } = node;
  const Icon = Icons[node.data.icon];
  const { setBotNodeData,setShowBotProperty } = useBotPropertyStore();

  const handleToggleDrawer = () => {
    if(node.data){
     setBotNodeData(null);
    }
   
    setShowBotProperty(true);
    setBotNodeData(node);
  };
  return (
    <Card
      className={`flex flex-col   py-3 rounded-md shadow-md bg-white min-w-72 overflow-hidden relative hover:ring-4
     hover:ring-sky-500 ${selected && 'ring-4 ring-sky-500'}`}
     onClick={handleToggleDrawer}
    >
      <CardContent className='pb-0 px-0'>
        <div className='flex items-center gap-8 px-3'>
          {/* icon */}
          <Icon className='size-6' />
          <div className='flex flex-col'>
            <h3 className='text-lg text-gray-900 font-bold'>
              {node?.data.label}
            </h3>
            {node?.data.description && (
              <p className='text-gray-600 text-lg w-[120px] text-wrap'>
                {node?.data?.description}
              </p>
            )}
          </div>
        </div>
        {children && (
          <>
            <div className='w-full' >
            {children}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
