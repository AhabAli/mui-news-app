import { Chip, Stack } from "@mui/material";
import * as React from "react";

export interface ITopicsProps {
  updateTopic: Function;
}

export function Topics({ updateTopic }: ITopicsProps) {
  const topics = ["apple", "meta", "netflix", "google", "twitter", "tesla"];

  return (
    <Stack direction="row" spacing={1}>
      {topics.map((topic, index) => {
        return (
          <Chip
            key={index}
            label={topic}
            sx={{ textTransform: "capitalize" }}
            onClick={() => updateTopic(topic)}
            variant="outlined"
          />
        );
      })}
    </Stack>
  );
}
