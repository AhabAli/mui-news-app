import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { ThemeModeContext } from "../../contexts";
import { LIGHT_MODE_THEME } from "../../utils/constants";
import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export interface IThemeToggleProps {}

export function ThemeToggle(props: IThemeToggleProps) {
  const theme = useTheme();
  const { toggleThemeMode } = useContext(ThemeModeContext);
  return (
    <Tooltip
      title={`Switch to ${
        theme.palette.mode === LIGHT_MODE_THEME ? "Dark" : "Light"
      } Mode`}
    >
      <IconButton aria-label="Switch Theme" onClick={toggleThemeMode}>
        {theme.palette.mode === LIGHT_MODE_THEME ? (
          <LightModeIcon />
        ) : (
          <DarkModeIcon />
        )}
      </IconButton>
    </Tooltip>
  );
}
