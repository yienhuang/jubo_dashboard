import { Fragment } from 'react'
import { Box, Divider, Typography } from '@mui/material'

import { SummaryCard } from '@/components/SectionBlocks'

const PRIMARY = '#0097A7'
const WARNING_ACCENT = '#FF9800'

export function HighlightItem({ item }) {
  const accent = item.tone === 'warning' ? WARNING_ACCENT : PRIMARY

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'stretch' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, alignSelf: 'stretch' }}>
        <Box
          sx={{
            width: 4,
            alignSelf: 'stretch',
            borderRadius: '18px',
            bgcolor: accent,
          }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 0.5,
        }}
      >
        <Typography variant="body1" sx={{ color: 'text.primary' }}>
          {item.facility}：{item.metric}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {item.hint}
        </Typography>
      </Box>
    </Box>
  )
}

export default function HighlightsCard({ title = '重點摘要', subtitle, items }) {
  return (
    <SummaryCard title={title} subtitle={subtitle}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {items.map((item, idx) => (
          <Fragment key={`${item.facility}-${item.metric}`}>
            {idx > 0 && <Divider />}
            <HighlightItem item={item} />
          </Fragment>
        ))}
      </Box>
    </SummaryCard>
  )
}
