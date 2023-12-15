import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Typography } from "@mui/material";

export interface ILanguageToggleButtonProps {
  selectedLanguage: string;
  updateLanguage: any;
}

export function LanguageToggleButton({
  selectedLanguage,
  updateLanguage,
}: ILanguageToggleButtonProps) {
  return (
    <ToggleButtonGroup
      value={selectedLanguage}
      exclusive
      onChange={updateLanguage}
      aria-label="language Update"
    >
      <ToggleButton value="en" aria-label="english language">
        <Typography variant="h6" component={"p"}>
          EN
        </Typography>
      </ToggleButton>
      <ToggleButton value="ar" aria-label="arabic language">
        <Typography variant="h6" component={"p"}>
          AR
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
