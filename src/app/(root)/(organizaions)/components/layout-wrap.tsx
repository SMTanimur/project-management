'use client';
import {
  Button,
  Card,
  CardContent,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components';
import { useMediaQuery, useUser } from '@/hooks';
import { cn } from '@/lib';

import React, { ReactNode } from 'react';
import { Nav } from './nav';
import { organizationSidebarConfig } from '@/configs';
import { Separator } from '@radix-ui/react-select';
import { getCookie } from '@/libs';

interface LayoutWrapProps {
  children: ReactNode;
  defaultLayout?: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export const LayoutWrap: React.FC<LayoutWrapProps> = ({
  children,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const cookie = getCookie();
  const isDesktop = useMediaQuery('(max-width: 1280px)');

  return cookie ? (
    <div className='flex w-full h-[calc(100vh-65px)]'>
      <ResizablePanelGroup
        direction='horizontal'
        onLayout={sizes => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className='relative '
      >
        {!isDesktop && (
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={15}
            maxSize={20}
            onCollapse={collapsed => {
              setIsCollapsed(collapsed);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                collapsed
              )}`;
            }}
            className={cn(
              '',
              isCollapsed &&
                'min-w-[50px] transition-all duration-300 ease-in-out '
            )}
          >
            <Card className='h-full overflow-auto no-scrollbar'>
              {/* <CardHeader
                    className={cn(
                      "border-none mb-0 pb-0 sticky bg-card top-0  px-6 z-[99]",
                      {
                        "px-2": isCollapsed,
                      }
                    )}
                  >
                    <Button
                      size={isCollapsed ? "icon" : "default"}
                     
                      className={isCollapsed ? "w-full" : ""}
                    >
                      <Plus
                        className={cn("w-4 h-4 ltr:mr-1 rtl:ml-1", {
                          "mr-0 w-5 h-5": isCollapsed,
                        })}
                      />
                      {!isCollapsed && "Compose"}
                    </Button>
                  </CardHeader> */}
              <CardContent
                className={cn('', {
                  'px-2': isCollapsed,
                })}
              >
                <Nav
                  isCollapsed={isCollapsed}
                  links={organizationSidebarConfig}
                />

                <Separator />
              </CardContent>
            </Card>
          </ResizablePanel>
        )}
        {!isDesktop && <ResizableHandle withHandle />}
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ) : (
    // Render only children if data is not available
    <div>{children}</div>
  );
};
