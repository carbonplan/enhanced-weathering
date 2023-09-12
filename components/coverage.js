import { Badge } from '@carbonplan/components'
import { Box } from 'theme-ui'
import { alpha } from '@theme-ui/color'

const COLORS = {
  rock: 'purple',
  init_weathering: 'grey',
  field: 'yellow',
  watershed: 'green',
  ocean: 'teal',
}

const LABELS = {
  0: 'N/A',
  1: 'Extra',
  2: 'Secondary',
  3: 'Primary',
  4: 'Essential',
}

const Coverage = ({ type, value, color }) => {
  if (value === 0) {
    return (
      <Box sx={{ color: alpha(color ?? COLORS[type], 0.4) }}>
        {LABELS[value]}
      </Box>
    )
  } else {
    return <Badge sx={{ color: color ?? COLORS[type] }}>{LABELS[value]}</Badge>
  }
}

export default Coverage
