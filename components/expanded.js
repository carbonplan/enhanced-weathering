import { Column, Link, Row } from '@carbonplan/components'
import { Box, IconButton } from 'theme-ui'
import { createElement } from 'react'
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'
import { XCircle } from '@carbonplan/icons'
import Tooltip from './tooltip'

const processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(rehype2react, {
    createElement,
    components: {
      a: Link,
    },
  })

export const ExpandedColumn = ({
  label,
  children,
  start,
  width,
  tooltip,
  mdx = false,
  ...props
}) => {
  return (
    <Column
      start={Array.isArray(start) ? start.map((s) => s + 1) : start + 1}
      width={width}
      {...props}
    >
      <Box
        sx={{
          color: 'secondary',
          fontFamily: 'mono',
          letterSpacing: 'mono',
          textTransform: 'uppercase',
          mb: 2,
          fontSize: [1, 1, 1, 2],
        }}
      >
        {tooltip ? <Tooltip tooltip={tooltip}>{label}</Tooltip> : label}
      </Box>
      <Box sx={{ fontFamily: 'faux', letterSpacing: 'faux' }}>
        {mdx ? processor.processSync(children).result : children}
      </Box>
    </Column>
  )
}

export const ExpandedRow = ({
  children,
  accent = 'secondary',
  onClose,
  sx,
  ...props
}) => {
  return (
    <Row
      columns={[6, 8, 10, 10]}
      sx={{
        pt: 4,
        pb: 5,
        mb: 4,
        bg: 'muted',
        fontSize: [1, 1, 1, 2],
        ...sx,
      }}
      {...props}
    >
      <Column start={1} width={1}>
        <IconButton
          sx={{
            mt: -2,
            ml: 3,
            p: 0,
            cursor: 'pointer',
            '&:hover svg': { stroke: 'primary' },
          }}
          onClick={onClose}
        >
          <XCircle sx={{ stroke: accent, transition: 'stroke 0.15s' }} />
        </IconButton>
      </Column>
      {children}
    </Row>
  )
}
