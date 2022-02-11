import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import theme from "../src/theme";

import "../styles/globals.css";
import createEmotionCache from "../src/createEmotionCache";
import Head from "next/head";

const clientSideEmotionCache = createEmotionCache();
const defaultTheme = createTheme(theme);

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <>
      <Head>
        <title>ngelink.id</title>
      </Head>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
