"use client";


import { getTranslation } from "@/i18n/i18n";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import themeConfig from "../../../theme.config";

export const QueryProvider = async({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
          },
        },
      })
  );
 
  const { initLocale } = getTranslation();

  useEffect(() => {
  
    initLocale(themeConfig.locale);

    
}, [ initLocale, ]);

  // await queryClient.prefetchQuery({
  //   queryKey: ['products'],
  //   queryFn: async () =>  productClient.getProducts
  // });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
};