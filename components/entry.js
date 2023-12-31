import { Button, Column, Expander, FadeIn, Row } from '@carbonplan/components'
import { Box, Flex } from 'theme-ui'
import { useEffect, useMemo, useRef, useState } from 'react'
import { RotatingArrow } from '@carbonplan/icons'
import AnimateHeight from 'react-animate-height'

import Coverage from './coverage'
import { ExpandedColumn, ExpandedRow } from './expanded'
import legend from '../public/research/ew-quantification/legend.json'

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
    borderTopWidth: 1,
  },
}

const COVERAGE = [
  { type: 'rock', label: 'Rock application', color: 'purple' },
  { type: 'init_weathering', label: 'Initial weathering', color: 'grey' },
  { type: 'field', label: 'Field processes', color: 'yellow' },
  { type: 'watershed', label: 'Watershed transport', color: 'green' },
  { type: 'ocean', label: 'Ocean storage', color: 'teal' },
]

const List = ({ values }) => {
  if (values.length === 0) {
    return 'N/A'
  }

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      {values.map((value, i) => (
        <Box as="span" key={value}>
          {value !== 'n/a'
            ? `${value[0].toUpperCase()}${value.slice(1)}`
            : 'N/A'}
          {i < values.length - 1 ? ', ' : ''}
        </Box>
      ))}
    </Flex>
  )
}

const Entry = ({
  active,
  variable,
  method,
  coverage,
  transient,
  type,
  category,
  impacts,
  notes,
  comments,
  references,
  border,
}) => {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef()
  const color = useMemo(() => {
    const result = COVERAGE.reduce(
      (max, { type, color }) => {
        if (coverage[type] > max.value) {
          return { value: coverage[type], color }
        } else {
          return max
        }
      },
      { value: 0, color: 'grey' },
    )
    return result.color
  }, [coverage])

  useEffect(() => {
    if (active) {
      setExpanded(true)
    }
  }, [active])

  useEffect(() => {
    if (active && ref.current) {
      window.scrollTo({
        left: 0,
        top: ref.current.getBoundingClientRect().top - 240,
        behavior: 'smooth',
      })
    }
  }, [active])

  return (
    <>
      <Row
        as="tr"
        columns={[6, 8, 10, 10]}
        onClick={() => setExpanded(!expanded)}
        sx={{
          py: 4,
          cursor: 'pointer',
          '&:hover button': { stroke: color },
          fontSize: [2, 2, 2, 3],
          ...(border ? sx.border : {}),
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
              '&:hover svg': {
                stroke: color,
              },
              position: ['relative', 'absolute', 'absolute', 'absolute'],
              left: [0, -21, -26, -26],
              width: '18px',
              height: '18px',
            }}
            onClick={() => setExpanded(!expanded)}
          />
          {variable}
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
          {method}
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

      <Box as="tr" sx={sx.reset} ref={ref}>
        <td>
          <AnimateHeight
            duration={100}
            height={expanded ? 'auto' : 0}
            easing={'linear'}
          >
            <FadeIn>
              <ExpandedRow onClose={() => setExpanded(false)} color={color}>
                {COVERAGE.map(({ type, label }, i) => (
                  <ExpandedColumn
                    color={color}
                    key={type}
                    start={i % 2 === 0 ? 1 : 4}
                    width={2}
                    sx={{
                      display: ['inherit', 'none', 'none', 'none'],
                      mb: 3,
                    }}
                    label={label}
                  >
                    <Coverage
                      type={type}
                      value={coverage[type]}
                      color={color}
                    />
                  </ExpandedColumn>
                ))}
                <ExpandedColumn
                  color={color}
                  start={1}
                  width={[2, 3, 2, 2]}
                  label="Transient"
                  tooltip={legend.transient}
                >
                  <List values={[transient]} />
                </ExpandedColumn>
                <ExpandedColumn
                  color={color}
                  start={[4, 4, 3, 3]}
                  width={[2, 3, 2, 2]}
                  label="Type"
                  tooltip={legend.type}
                >
                  <List values={type} />
                </ExpandedColumn>
                <ExpandedColumn
                  color={color}
                  start={[1, 1, 5, 5]}
                  width={[2, 3, 2, 2]}
                  label="Category"
                  tooltip={legend.category}
                  sx={{ mt: [3, 3, 0, 0] }}
                >
                  <List values={category} />
                </ExpandedColumn>
                <ExpandedColumn
                  color={color}
                  start={[4, 4, 7, 7]}
                  width={[2, 3, 2, 2]}
                  label="Impacts"
                  tooltip={legend.impacts}
                  sx={{ mt: [3, 3, 0, 0] }}
                >
                  <List values={impacts} />
                </ExpandedColumn>
                <ExpandedColumn
                  color={color}
                  start={1}
                  width={[5, 3, 4, 4]}
                  label="Notes"
                  sx={{ mt: [3, 5, 5, 5] }}
                  mdx
                >
                  {notes}
                </ExpandedColumn>

                <Column start={[2, 5, 6, 6]} width={[5, 3, 4, 4]}>
                  <Row columns={[5, 3, 4, 4]}>
                    <ExpandedColumn
                      color={color}
                      offset={0}
                      start={[1]}
                      width={[5, 3, 4, 4]}
                      label="Comments"
                      mdx
                      sx={{ mt: [3, 5, 5, 5] }}
                    >
                      {comments}
                    </ExpandedColumn>
                    {references.length > 0 && (
                      <ExpandedColumn
                        color={color}
                        offset={0}
                        start={[1]}
                        width={[5, 3, 4, 4]}
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
                              sx={{
                                fontFamily: 'faux',
                                letterSpacing: 'faux',
                                fontSize: [1, 1, 1, 2],
                              }}
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
