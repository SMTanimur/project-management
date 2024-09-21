import { Icons } from '@/components/ui/icons';
import { getTranslation } from '@/i18n/i18n';
import { LayoutDashboardIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const HeaderBottom = () => {
  const { t, i18n } = getTranslation();
  return (
    <div className=' border-t z-10 border-[#ebedf2] bg-white py-1.5 font-semibold text-black dark:border-[#191e3a] dark:bg-black dark:text-white-dark shadow-md'>
      <ul className='horizontal-menu hidden  lg:space-x-1.5 xl:space-x-8 container'>
        <li className='menu nav-item relative text-sm'>
          <button type='button' className='nav-link'>
            <div className='flex items-center'>
              <Icons.home className='shrink-0' />
              <span className='px-1'>{t('dashboard')}</span>
            </div>
            <div className='right_arrow'>
              <Icons.chevronRight className='w-5 h-5' />
            </div>
          </button>
          <ul className='sub-menu'>
            <li>
              <Link href='/'>{t('sales')}</Link>
            </li>
            <li>
              <Link href='/workflows'>{t('workflows')}</Link>
            </li>
            <li>
              <Link href='/editor'>{t('editor')}</Link>
            </li>
          </ul>
        </li>
        <li className='menu nav-item relative text-sm'>
          <button type='button' className='nav-link'>
            <div className='flex items-center'>
              <LayoutDashboardIcon className='shrink-0' />
              <span className='px-1'>{t('apps')}</span>
            </div>
            <div className='right_arrow'>
              <Icons.chevronRight className='w-5 h-5' />
            </div>
          </button>
          <ul className='sub-menu'>
            <li>
              <Link href='/apps/chat'>{t('chat')}</Link>
            </li>
            <li>
              <Link href='/apps/mailbox'>{t('mailbox')}</Link>
            </li>
            <li>
              <Link href='/apps/todolist'>{t('todo_list')}</Link>
            </li>
            <li>
              <Link href='/apps/notes'>{t('notes')}</Link>
            </li>
            <li>
              <Link href='/apps/scrumboard'>{t('scrumboard')}</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
