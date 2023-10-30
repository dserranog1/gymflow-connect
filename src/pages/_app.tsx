import MainLayout from "@/components/layouts/MainLayout";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //never re-fetch unless query is invalited manualy
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Component {...pageProps} />
        <Toaster />
      </MainLayout>
    </QueryClientProvider>
  );
}
export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
