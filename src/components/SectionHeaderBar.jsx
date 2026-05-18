import { Typography } from '@mui/material'

export default function SectionHeaderBar({ title }) {
  return (
    <Typography variant="h6" sx={{ pl: 1, color: 'secondary.dark' }}>
      {title}
    </Typography>
  )
}
