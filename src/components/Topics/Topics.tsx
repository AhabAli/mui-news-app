import { Chip, Stack, Box } from '@mui/material'
import * as React from 'react'

export interface ITopicsProps {
  active?: string
  updateTopic: Function
}

export function Topics({ updateTopic, active }: ITopicsProps) {
  const topics = ['apple', 'meta', 'netflix', 'google', 'twitter', 'tesla']

  return (
    <Box component="section" sx={{ p: 2 }}>
      <h3> Filter by Topics: </h3>
      <Stack direction="row" spacing={1}>
        {topics.map((topic, index) => {
          return (
            <Chip
              key={index}
              label={topic}
              sx={{ textTransform: 'capitalize' }}
              onClick={() => updateTopic(topic)}
              color={active === topic ? 'primary' : 'default'}
              // variant={'outlined'}
            />
          )
        })}
      </Stack>
    </Box>
  )
}
