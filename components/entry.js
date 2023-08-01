import { Button, Column, Expander, Link, Row } from '@carbonplan/components'
import { Box, Flex } from 'theme-ui'
import { createElement, useState } from 'react'
import { RotatingArrow } from '@carbonplan/icons'
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'

import Coverage from './coverage'

const processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(rehype2react, {
    createElement,
    components: {
      a: Link,
    },
  })

const ExpandedContent = ({ label, children, mdx = false, ...props }) => {
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
        {process ? processor.processSync(children).result : children}
      </Box>
    </Column>
  )
}

const Entry = ({
  target,
  tool,
  coverage: { rock, init_weathering, field, watershed, ocean },
  transient,
  type,
  category,
  impacts,
  notes,
  comments,
  references,
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <Row
        as="tr"
        columns={[6, 8, 10, 10]}
        onClick={() => setExpanded(!expanded)}
        sx={{
          my: 4,
          cursor: 'pointer',
          '&:hover button': { stroke: 'primary' },
        }}
      >
        <Column as="td" start={1} width={[2]} sx={{ position: 'relative' }}>
          <Expander
            value={expanded}
            sx={{ position: 'absolute', left: -30 }}
            onClick={() => setExpanded(!expanded)}
          />
          {target}
        </Column>
        <Column as="td" start={[3]} width={[3]}>
          {tool}
        </Column>
        <Column as="td" start={[6]} width={[1]}>
          <Coverage type="rock" value={rock} />
        </Column>
        <Column as="td" start={[7]} width={[1]}>
          <Coverage type="init_weathering" value={init_weathering} />
        </Column>
        <Column as="td" start={[8]} width={[1]}>
          <Coverage type="field" value={field} />
        </Column>
        <Column as="td" start={[9]} width={[1]}>
          <Coverage type="watershed" value={watershed} />
        </Column>
        <Column as="td" start={[10]} width={[1]}>
          <Coverage type="ocean" value={ocean} />
        </Column>
      </Row>
      {expanded && (
        <Row
          as="tr"
          columns={[6, 8, 10, 10]}
          sx={{ px: [4, 5, 5, 6], mx: [-4, -5, -5, -6], py: 4, bg: 'muted' }}
        >
          <ExpandedContent start={1} width={[2]} label="Transient">
            {transient}
          </ExpandedContent>
          <ExpandedContent start={[3]} width={[2]} label="Type">
            {type}
          </ExpandedContent>
          <ExpandedContent start={[5]} width={[2]} label="Category">
            {category}
          </ExpandedContent>
          <ExpandedContent start={[7]} width={[2]} label="Impacts">
            {impacts}
          </ExpandedContent>
          <ExpandedContent
            start={1}
            width={[4]}
            label="Notes"
            sx={{ mt: 5 }}
            mdx
          >
            {notes}
          </ExpandedContent>

          <Column as="td" start={[6]} width={[4]}>
            <Row columns={[4]}>
              <ExpandedContent
                start={[1]}
                width={[4]}
                label="Comments"
                as="div"
                mdx
                sx={{ mt: 5 }}
              >
                {comments}
              </ExpandedContent>
              {references.length > 0 && (
                <ExpandedContent
                  start={[1]}
                  width={[4]}
                  label="References"
                  as="div"
                  sx={{ mt: 5 }}
                >
                  <Flex sx={{ flexDirection: 'column', gap: 2 }}>
                    {references.map(({ name, href }) => (
                      <Button key={name} href={href} suffix={<RotatingArrow />}>
                        {name}
                      </Button>
                    ))}
                  </Flex>
                </ExpandedContent>
              )}
            </Row>
          </Column>
        </Row>
      )}
    </>
  )
}

export default Entry
