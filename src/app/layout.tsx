import '@/styles/globals.css';
import '@/styles/theme.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@xyflow/react/dist/style.css';
import type { Metadata } from 'next';
import themeConfig from '../../theme.config';
import { QueryProvider } from './provider/query.provider';
import { GlobalProvider } from './provider/global.provider';
import GlobalModals from './provider/GlobalModals';
import { PusherProvider } from './provider/pusher-provider';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Organize',
  description: 'Organize your work and life',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <GlobalProvider>
          <QueryProvider>
            <PusherProvider>
              <Toaster position='top-center' richColors />
              <GlobalModals />
              <div className={`${themeConfig.navbar}`}>{children}</div>
            </PusherProvider>
          </QueryProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
