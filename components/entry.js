import {
  Button,
  Column,
  Expander,
  FadeIn,
  Row,
  Tag,
} from '@carbonplan/components'
import { Box, Flex } from 'theme-ui'
import { useState } from 'react'
import { RotatingArrow } from '@carbonplan/icons'

import Coverage from './coverage'
import { ExpandedColumn, ExpandedRow } from './expanded'
import AnimateHeight from 'react-animate-height'

const sx = {
  reset: {
    display: 'block',
    width: 'auto',
    height: 'auto',
    borderCollapse: 'inherit',
    borderSpacing: 0,
    borderColor: 'inherit',
    verticalAlign: 'inherit',
  },
  border: {
    borderStyle: 'solid',
    borderColor: 'muted',
    borderWidth: 0,
    borderBottomWidth: 1,
  },
}

const COVERAGE = [
  { type: 'rock', label: 'Rock application' },
  { type: 'init_weathering', label: 'Initial weathering' },
  { type: 'field', label: 'Field processes' },
  { type: 'watershed', label: 'Watershed transport' },
  { type: 'ocean', label: 'Ocean storage' },
]

const Entry = ({
  target,
  tool,
  coverage,
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
          py: 4,
          cursor: 'pointer',
          '&:hover button': { stroke: 'primary' },
          fontSize: [2, 2, 2, 3],
          ...(expanded ? {} : sx.border),
        }}
      >
        <Column
          as="td"
          start={1}
          width={[3, 3, 2, 2]}
          sx={{ position: 'relative' }}
        >
          <Expander
            value={expanded}
            sx={{
              position: ['relative', 'absolute', 'absolute', 'absolute'],
              left: [0, -21, -26, -26],
              width: '18px',
              height: '18px',
            }}
            onClick={() => setExpanded(!expanded)}
          />
          {target}
        </Column>
        <Column
          as="td"
          start={[4, 1, 3, 3]}
          width={[3]}
          sx={{
            mt: [0, 2, 0, 0],
            color: ['primary', 'secondary', 'primary', 'primary'],
            order: [0, 1, 0, 0],
          }}
        >
          {tool}
        </Column>
        {COVERAGE.map(({ type }, i) => (
          <Column
            key={type}
            as="td"
            start={[4, 4, 6, 6].map((d) => d + i)}
            width={[1]}
            sx={{ display: ['none', 'inherit', 'inherit', 'inherit'] }}
          >
            <Coverage type={type} value={coverage[type]} />
          </Column>
        ))}
      </Row>

      <Box
        as="tr"
        sx={{
          ...sx.reset,
          ...(expanded
            ? {
                ...sx.border,
                mb: 3,
              }
            : {}),
        }}
      >
        <td>
          <AnimateHeight
            duration={100}
            height={expanded ? 'auto' : 0}
            easing={'linear'}
          >
            <FadeIn>
              <ExpandedRow onClose={() => setExpanded(false)}>
                {COVERAGE.map(({ type, label }, i) => (
                  <ExpandedColumn
                    start={i % 2 === 0 ? 1 : 4}
                    width={2}
                    sx={{
                      display: ['inherit', 'none', 'none', 'none'],
                      mb: 3,
                    }}
                    label={label}
                  >
                    <Coverage type={type} value={coverage[type]} />
                  </ExpandedColumn>
                ))}
                <ExpandedColumn
                  start={1}
                  width={[2, 3, 2, 2]}
                  label="Transient"
                >
                  {transient}
                </ExpandedColumn>
                <ExpandedColumn
                  start={[4, 4, 3, 3]}
                  width={[2, 3, 2, 2]}
                  label="Type"
                >
                  {type}
                </ExpandedColumn>
                <ExpandedColumn
                  start={[1, 1, 5, 5]}
                  width={[2, 3, 2, 2]}
                  label="Category"
                  sx={{ mt: [3, 3, 0, 0] }}
                >
                  <Flex sx={{ gap: 2 }}>
                    {category
                      .filter((c) => c !== 'n/a')
                      .map((c) => (
                        <Tag key={c}>{c}</Tag>
                      ))}
                    {category.length === 1 && category[0] === 'n/a' && 'n/a'}
                  </Flex>
                </ExpandedColumn>
                <ExpandedColumn
                  start={[4, 4, 7, 7]}
                  width={[2, 3, 2, 2]}
                  label="Impacts"
                  sx={{ mt: [3, 3, 0, 0] }}
                >
                  {impacts.map(
                    (impact, i) =>
                      `${impact}${i < impacts.length - 1 ? ', ' : ''}`,
                  )}
                  {impacts.length === 0 && 'n/a'}
                </ExpandedColumn>
                <ExpandedColumn
                  start={1}
                  width={[5, 3, 4, 4]}
                  label="Notes"
                  sx={{ mt: [3, 5, 5, 5] }}
                  mdx
                >
                  {notes}
                </ExpandedColumn>

                <Column start={[1, 5, 6, 6]} width={[6, 4, 4, 4]}>
                  <Row columns={[6, 4, 4, 4]}>
                    <ExpandedColumn
                      start={[1]}
                      width={[5, 4, 4, 4]}
                      label="Comments"
                      mdx
                      sx={{ mt: [3, 5, 5, 5] }}
                    >
                      {comments}
                    </ExpandedColumn>
                    {references.length > 0 && (
                      <ExpandedColumn
                        start={[1]}
                        width={[6, 4, 4, 4]}
                        label="References"
                        sx={{ mt: [3, 5, 5, 5] }}
                      >
                        <Flex sx={{ flexDirection: 'column', gap: 2 }}>
                          {references.map(({ name, href }) => (
                            <Button
                              key={name}
                              href={href}
                              suffix={<RotatingArrow />}
                              size="xs"
                            >
                              {name}
                            </Button>
                          ))}
                        </Flex>
                      </ExpandedColumn>
                    )}
                  </Row>
                </Column>
              </ExpandedRow>
            </FadeIn>
          </AnimateHeight>
        </td>
      </Box>
    </>
  )
}

export default Entry
