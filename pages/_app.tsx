import type { AppProps } from "next/app";
import Head from "next/head";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import { wrapper } from "@client/redux";

import theme from "@client/theme";
import "@client/styles/globals.css";
import createEmotionCache from "@client/createEmotionCache";

import { NextPageWithLayout } from "@client/types";

const clientSideEmotionCache = createEmotionCache();
const defaultTheme = createTheme(theme);

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

interface MyAppProps extends AppPropsWithLayout {
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        <title>ngelink.id</title>
      </Head>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
