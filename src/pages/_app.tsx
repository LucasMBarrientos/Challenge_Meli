import React from "react";
import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider} from "@mui/material/styles";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { EmotionCache } from "@emotion/cache";

import createEmotionCache from "@/utils/emotionCache";
import Main from "@/layout/Main";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache: EmotionCache;
}

const App = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Mercado Libre</title>
        <meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport" />
        <meta content="Titulo" name="description" />
        <link href="/favicon.png" rel="icon" type="image/x-icon" />
      </Head>
      <StyledEngineProvider injectFirst>
          <CssBaseline />
          <Main>
            <Component {...pageProps} />
          </Main>
      </StyledEngineProvider>
    </CacheProvider>
  );
};

export default App;
