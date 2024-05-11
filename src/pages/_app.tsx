import '../core/iconify-bundle/icons-bundle-react';

import { CacheProvider, EmotionCache } from '@emotion/react';

import { AppProps } from 'next/app';
import { AuthProvider } from '../core/layout/AuthContext';
import BlankLayout from '../core/layout/BlankLayout';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import Layout from '../core/layout/Layout';
import { LayoutProvider } from '../core/layout/LayoutContext';
import type { NextPage } from 'next'
import { ProductProvider } from '../views/products/ProductsContext';
import ReactHotToast from '../core/components/react-hot-toast';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast'
import createEmotionCache from '../createEmotionCache';
import theme from '../theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  Component: NextPage;
  emotionCache?: EmotionCache;
  isExternal?: boolean;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const isExternal = Component.isExternal ?? false


  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <LayoutProvider>
            {
              isExternal ? <BlankLayout>
                <CssBaseline />
                <Component {...pageProps} />
                </BlankLayout>:
                <ProductProvider>
                  <Layout>
                    <CssBaseline />
                    <Component {...pageProps} />
                    <ReactHotToast>
                      <Toaster position={'bottom-right'} toastOptions={{ className: 'react-hot-toast' }} />
                    </ReactHotToast>
                  </Layout>
                </ProductProvider>
            }
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          </LayoutProvider>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
