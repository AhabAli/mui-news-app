import React, { useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { getAppTheme } from "./theme/theme";
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from "./utils/constants";
import { ThemeModeContext } from "./contexts";
import { BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import { Layout } from "./components/Layout";

function App() {
  const [mode, setMode] = useState<
    typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME
  >(LIGHT_MODE_THEME);

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) =>
          prevMode === LIGHT_MODE_THEME ? DARK_MODE_THEME : LIGHT_MODE_THEME
        );
      },
    }),
    []
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
