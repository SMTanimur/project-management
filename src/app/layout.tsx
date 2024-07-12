
import "@/styles/globals.css";
import "sweetalert2/dist/sweetalert2.min.css";
import '@xyflow/react/dist/style.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import themeConfig from "../../theme.config";
import { QueryProvider } from "./provider/query.provider";
import { ThemeProvider } from "./provider/theme.provider";
import { GlobalProvider } from "./provider/global.provider";
import GlobalModals from "./provider/GlobalModals";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      
      <GlobalProvider>
        <QueryProvider>
          <ThemeProvider>
            <GlobalModals/>
            <div className={`${themeConfig.navbar} `}>{children}</div>
           
          </ThemeProvider>
        </QueryProvider>
        </GlobalProvider>
       
      </body>
    </html>
  );
}
