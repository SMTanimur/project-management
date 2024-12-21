import { Button } from '@/components';
import { Card } from '@/components';
import { Icons } from '@/components';
import { Diamond, ListChecks, ThumbsUp } from 'lucide-react';
import { FC } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
interface ITodoSidebarProps {
  tabChanged: () => void;
  selectedTab: string;
  setSelectedTab: (value: string) => void;
  allTasks: any;
  addEditTask: () => void;
}

const TodoSidebar: FC<ITodoSidebarProps> = ({
  addEditTask,
  allTasks,
  selectedTab,
  setSelectedTab,
  tabChanged,
}) => {
  return (
    <Card
      className={` absolute z-10 hidden h-full  w-[240px] max-w-full flex-none space-y-4 p-4 rounded-r-none  xl:relative xl:block xl:h-auto xl:rounded-r-md `}
    >
      <div className='flex h-full flex-col pb-16'>
        <div className='pb-5'>
          <div className='flex items-center text-center'>
            <div className='shrink-0'>
              <Icons.clickboard className='w-5 h-5' />
            </div>
            <h3 className='text-lg font-semibold ml-3 '>Todo list</h3>
          </div>
        </div>
        <div className='mb-5 h-px w-full border-b border-white-light dark:border-[#1b2e4b]'></div>
        <PerfectScrollbar className='relative h-full grow -mr-3.5 pr-3.5 '>
          <div className='space-y-1'>
            <button
              type='button'
              className={`flex h-10 w-full items-center justify-between rounded-md p-2 font-medium hover:bg-white-dark/10 hover:text-primary dark:hover:bg-[#181F32] dark:hover:text-primary ${
                selectedTab === ''
                  ? 'bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary'
                  : ''
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab('');
              }}
            >
              <div className='flex items-center'>
                <ListChecks className='h-[18px] w-[18px]' />
                <div className='ml-3 '>Inbox</div>
              </div>
              <div className='whitespace-nowrap rounded-md bg-accent px-2 py-0.5 font-semibold dark:bg-[#060818]'>
                {allTasks &&
                  allTasks.filter((d: any) => d.status !== 'trash').length}
              </div>
            </button>
            <button
              type='button'
              className={`flex h-10 w-full items-center justify-between rounded-md p-2 font-medium hover:bg-white-dark/10 hover:text-primary dark:hover:bg-[#181F32] dark:hover:text-primary ${
                selectedTab === 'complete' &&
                'bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary'
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab('complete');
              }}
            >
              <div className='flex items-center'>
                <ThumbsUp className='h-[18px] w-[18px] shrink-0' />
                <div className='ml-3 '>Done</div>
              </div>
              <div className='whitespace-nowrap rounded-md bg-accent px-2 py-0.5 font-semibold dark:bg-[#060818]'>
                {allTasks &&
                  allTasks.filter((d: any) => d.status === 'complete').length}
              </div>
            </button>
            <button
              type='button'
              className={`flex h-10 w-full items-center justify-between rounded-md p-2 font-medium hover:bg-white-dark/10 hover:text-primary dark:hover:bg-[#181F32] dark:hover:text-primary ${
                selectedTab === 'important' &&
                'bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary'
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab('important');
              }}
            >
              <div className='flex items-center'>
                <Icons.star className='shrink-0 w-[18px] h-[18px]' />
                <div className='ml-3'>Important</div>
              </div>
              <div className='whitespace-nowrap rounded-md bg-accent px-2 py-0.5 font-semibold dark:bg-[#060818]'>
                {allTasks &&
                  allTasks.filter((d: any) => d.status === 'important').length}
              </div>
            </button>
            <button
              type='button'
              className={`flex h-10 w-full items-center justify-between rounded-md p-2 font-medium hover:bg-white-dark/10 hover:text-primary dark:hover:bg-[#181F32] dark:hover:text-primary ${
                selectedTab === 'trash' &&
                'bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary'
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab('trash');
              }}
            >
              <div className='flex items-center'>
                <Icons.trash className='shrink-0 w-[18px] h-[18px]' />
                <div className='ml-3'>Trash</div>
              </div>
            </button>
            <div className='h-px w-full border-b border-white-light dark:border-[#1b2e4b]'></div>
            <div className='px-1 py-3 text-white-dark'>Tags</div>
            <button
              type='button'
              className={`flex h-10 w-full items-center rounded-md p-1 font-medium text-success duration-300 hover:bg-white-dark/10 hover:pl-3  dark:hover:bg-[#181F32] ${
                selectedTab === 'team' && 'bg-gray-100 pl-3  dark:bg-[#181F32]'
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab('team');
              }}
            >
              <Diamond className='shrink-0 fill-success w-4 h-4' />
              <div className='ml-3 '>Team</div>
            </button>
            <button
              type='button'
              className={`flex h-10 w-full items-center rounded-md p-1 font-medium text-warning duration-300 hover:bg-white-dark/10 hover:pl-3  dark:hover:bg-[#181F32] ${
                selectedTab === 'low' && 'bg-gray-100 pl-3 dark:bg-[#181F32]'
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab('low');
              }}
            >
              <Diamond className='shrink-0 fill-warning w-4 h-4' />
              <div className='ml-3 '>Low</div>
            </button>

            <button
              type='button'
              className={`flex h-10 w-full items-center rounded-md p-1 font-medium text-primary duration-300 hover:bg-white-dark/10 hover:pl-3  dark:hover:bg-[#181F32] ${
                selectedTab === 'medium' &&
                'bg-gray-100 pl-3  dark:bg-[#181F32]'
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab('medium');
              }}
            >
              <Diamond className='shrink-0 fill-primary w-4 h-4' />
              <div className='ml-3 '>Medium</div>
            </button>
            <button
              type='button'
              className={`flex h-10 w-full items-center rounded-md p-1 font-medium text-danger duration-300 hover:bg-white-dark/10 hover:pl-3  dark:hover:bg-[#181F32] ${
                selectedTab === 'high' && 'bg-gray-100 pl-3  dark:bg-[#181F32]'
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab('high');
              }}
            >
              <Diamond className='shrink-0 fill-danger w-4 h-4' />
              <div className='ml-3 '>High</div>
            </button>
            <button
              type='button'
              className={`flex h-10 w-full items-center rounded-md p-1 font-medium text-info duration-300 hover:bg-white-dark/10 hover:pl-3  dark:hover:bg-[#181F32] ${
                selectedTab === 'update' &&
                'bg-gray-100 pl-3  dark:bg-[#181F32]'
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab('update');
              }}
            >
              <Diamond className='shrink-0 fill-info w-4 h-4' />
              <div className='ml-3 '>Update</div>
            </button>
          </div>
        </PerfectScrollbar>
        <div className='absolute bottom-0 w-full p-4 left-0 '>
          <Button
            className=' w-full'
            type='button'
            onClick={() => addEditTask()}
          >
            <Icons.plus className='shrink-0 mr-2 ' />
            Add New Task
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TodoSidebar;
