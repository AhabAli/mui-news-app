import React, { useMemo, useState } from "react";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { getAppTheme } from "./theme/theme";
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from "./utils/constants";
import { ThemeModeContext } from "./contexts";

import Home from "./pages/Home";

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
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
