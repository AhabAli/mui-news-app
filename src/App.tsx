import React, { useEffect, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { getAppTheme } from "./theme/theme";
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from "./utils/constants";
import { ThemeModeContext } from "./contexts";
import { BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import { Layout } from "./components/Layout";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [mode, setMode] = useLocalStorage("theme", DARK_MODE_THEME);

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        if (mode === DARK_MODE_THEME) {
          setMode(LIGHT_MODE_THEME);
        } else {
          setMode(DARK_MODE_THEME);
        }
      },
    }),
    [mode]
  );

  const theme = useMemo(() => getAppTheme(mode), [mode]);
  return (
    <BrowserRouter>
      <ThemeModeContext.Provider value={themeMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Home />
          </Layout>
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
