import { Card } from '@/components';
import { Icons } from '@/components/ui/icons';
import { Diamond, ListChecks, NotebookText, ThumbsUp } from 'lucide-react';
import { FC } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
interface INoteSidebarProps {
  tabChanged: (text: string) => void;
  selectedTab: string;
  editNote: () => void;
}

const NoteSidebar: FC<INoteSidebarProps> = ({
  editNote,

  selectedTab,

  tabChanged,
}) => {
  return (
    <Card
      className={` absolute z-10 hidden h-full  w-[240px] max-w-full flex-none space-y-4 p-4 rounded-r-none  xl:relative xl:block xl:h-auto xl:rounded-r-md `}
    >
      <div className='flex h-full flex-col pb-16'>
        <div className='flex items-center text-center'>
          <div className='shrink-0'>
            <NotebookText className='w-4 h-4' />
          </div>
          <h3 className='text-lg font-semibold ml-3'>Notes</h3>
        </div>

        <div className='my-4 h-px w-full border-b border-white-light dark:border-[#1b2e4b]'></div>
        <PerfectScrollbar className='relative h-full grow -mr-3.5   pl-3.5'>
          <div className='space-y-1'>
            <button
              type='button'
              className={`flex h-10 w-full items-center justify-between rounded-md p-2 font-medium hover:bg-white-dark/10 hover:text-primary dark:hover:bg-[#181F32] dark:hover:text-primary ${
                selectedTab === 'all' &&
                'bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary'
              }`}
              onClick={() => tabChanged('all')}
            >
              <div className='flex items-center'>
                <Icons.pencil className='shrink-0' />
                <div className=' mr-3'>All Notes</div>
              </div>
            </button>
            <button
              type='button'
              className={`flex h-10 w-full items-center justify-between rounded-md p-2 font-medium hover:bg-white-dark/10 hover:text-primary dark:hover:bg-[#181F32] dark:hover:text-primary ${
                selectedTab === 'fav' &&
                'bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary'
              }`}
              onClick={() => tabChanged('fav')}
            >
              <div className='flex items-center'>
                <Icons.star className='shrink-0' />
                <div className=' mr-3'>Favourites</div>
              </div>
            </button>
            <div className='h-px w-full border-b border-white-light dark:border-[#1b2e4b]'></div>
            <div className='px-1 py-3 text-white-dark'>Tags</div>
            <button
              type='button'
              className={`flex h-10 w-full items-center rounded-md p-1 font-medium text-primary duration-300 hover:bg-white-dark/10  hover:pr-3 dark:hover:bg-[#181F32] ${
                selectedTab === 'personal' &&
                'bg-gray-100  pr-3 dark:bg-[#181F32]'
              }`}
              onClick={() => tabChanged('personal')}
            >
              <Diamond className='shrink-0 fill-primary' />
              <div className=' mr-3'>Personal</div>
            </button>
            <button
              type='button'
              className={`flex h-10 w-full items-center rounded-md p-1 font-medium text-warning duration-300 hover:bg-white-dark/10  hover:pr-3 dark:hover:bg-[#181F32] ${
                selectedTab === 'work' && 'bg-gray-100  pr-3 dark:bg-[#181F32]'
              }`}
              onClick={() => tabChanged('work')}
            >
              <Diamond className='shrink-0 fill-warning' />
              <div className=' mr-3'>Work</div>
            </button>
            <button
              type='button'
              className={`flex h-10 w-full items-center rounded-md p-1 font-medium text-info duration-300 hover:bg-white-dark/10  hover:pr-3 dark:hover:bg-[#181F32] ${
                selectedTab === 'social' &&
                'bg-gray-100  pr-3 dark:bg-[#181F32]'
              }`}
              onClick={() => tabChanged('social')}
            >
              <Diamond className='shrink-0 fill-info' />
              <div className=' mr-3'>Social</div>
            </button>
            <button
              type='button'
              className={`flex h-10 w-full items-center rounded-md p-1 font-medium text-danger duration-300 hover:bg-white-dark/10  hover:pr-3 dark:hover:bg-[#181F32] ${
                selectedTab === 'important' &&
                'bg-gray-100  pr-3 dark:bg-[#181F32]'
              }`}
              onClick={() => tabChanged('important')}
            >
              <Diamond className='shrink-0 fill-danger' />
              <div className=' mr-3'>Important</div>
            </button>
          </div>
        </PerfectScrollbar>
      </div>
      <div className='absolute bottom-0 w-full p-4 ltr:left-0 right-0'>
        <button
          className='btn btn-primary w-full'
          type='button'
          onClick={() => editNote()}
        >
          <Icons.plus className='h-5 w-5 shrink-0  ml-2' />
          Add New Note
        </button>
      </div>
    </Card>
  );
};

export default NoteSidebar;
