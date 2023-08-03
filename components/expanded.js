import { Column, Link, Row } from '@carbonplan/components'
import { Box } from 'theme-ui'
import { createElement } from 'react'
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'

const processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(rehype2react, {
    createElement,
    components: {
      a: Link,
    },
  })

export const ExpandedColumn = ({ label, children, mdx = false, ...props }) => {
  return (
    <Column as="td" {...props}>
      <Box
        sx={{
          color: 'secondary',
          fontFamily: 'mono',
          letterSpacing: 'mono',
          textTransform: 'uppercase',
          mb: 2,
        }}
      >
        {label}
      </Box>
      <Box sx={{ fontFamily: 'faux', letterSpacing: 'faux' }}>
        {mdx ? processor.processSync(children).result : children}
      </Box>
    </Column>
  )
}

export const ExpandedRow = ({ children }) => {
  return (
    <Row
      as="tr"
      columns={[6, 8, 10, 10]}
      sx={{
        px: [4, 5, 5, 6],
        mx: [-4, -5, -5, -6],
        py: 4,
        mb: 4,
        bg: 'muted',
      }}
    >
      {children}
    </Row>
  )
}
