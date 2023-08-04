import { Badge, Column, Expander, FadeIn, Row } from '@carbonplan/components'
import { Triangle } from '@carbonplan/icons'
import { useState } from 'react'
import { Box, Flex, IconButton } from 'theme-ui'
import AnimateHeight from 'react-animate-height'
import { alpha } from '@theme-ui/color'

import legend from '../data/legend.json'
import { TooltipButton, TooltipContent } from './tooltip'
import { ExpandedColumn, ExpandedRow } from './expanded'

const sx = {
  reset: {
    display: 'block',
    width: 'auto',
    height: 'auto',
    borderCollapse: 'inherit',
    borderSpacing: 0,
    borderColor: 'inherit',
    verticalAlign: 'inherit',
    textAlign: 'left',
  },
}

const TableHeader = ({
  info,
  expanded,
  expander = 'expander',
  onExpand,
  children,
  onClick,
  active,
  sx,
  ...props
}) => {
  return (
    <Column
      as="th"
      {...props}
      sx={{ textAlign: 'left', fontSize: [0, 0, 0, 1], ...sx }}
    >
      <Flex
        onClick={() => {
          if (expander === 'expander' && onExpand) {
            onExpand()
          }
        }}
        sx={{
          height: '100%',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          '&:hover .highlight svg': { stroke: 'primary' },
          cursor: expander === 'expander' ? 'pointer' : 'inherit',
        }}
      >
        {onClick && (
          <IconButton
            sx={{
              p: 0,
              width: 10,
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
          >
            <Triangle
              sx={{
                transition: 'stroke 0.15s',
                stroke: active ? 'primary' : 'muted',
                fill: 'none',
                width: 10,
                height: 10,
              }}
            />
          </IconButton>
        )}

        <Flex
          className={expander === 'expander' ? 'highlight' : null}
          sx={{
            gap: expander === 'expander' ? 1 : 2,
            alignItems: 'flex-end',
            flexDirection: ['row-reverse', 'row', 'row', 'row'],
          }}
        >
          {onExpand &&
            (expander === 'expander' ? (
              <Expander
                className="highlight"
                value={expanded}
                sx={{
                  flexShrink: 0,
                  ml: '-22px',
                  width: '18px',
                  height: '18px',
                }}
                onClick={onExpand}
              />
            ) : (
              <TooltipButton
                color="muted"
                expanded={expanded}
                setExpanded={onExpand}
                sx={{ mb: -1, ml: [0, '-24px', '-24px', '-24px'] }}
              />
            ))}
          {children}
        </Flex>
      </Flex>
    </Column>
  )
}

const TableHead = ({ sort, setSort }) => {
  const [expanded, setExpanded] = useState(null)

  return (
    <Box
      as="thead"
      sx={{
        position: 'sticky',
        top: 56,
        zIndex: 1,
        display: 'block',
        borderStyle: 'solid',
        borderColor: 'muted',
        borderWidth: 0,
        borderBottomWidth: 1,
      }}
    >
      <Row
        as="tr"
        columns={[6, 8, 10, 10]}
        sx={{
          px: [4, 5, 5, 6],
          mx: [-4, -5, -5, -6],
          bg: 'background',
          pt: [0, 0, 0, 1],
          pb: [3, 3, 3, 4],
        }}
      >
        <TableHeader
          onClick={() => setSort('target')}
          active={sort === 'target'}
          start={1}
          width={[3, 3, 2, 2]}
          sx={{ display: ['inherit', 'none', 'inherit', 'inherit'] }}
          expanded={expanded?.id === 'target'}
          expander="tooltip"
          onExpand={() =>
            setExpanded(
              expanded?.id === 'target'
                ? null
                : { id: 'target', start: 1, width: [3, 3, 2, 2] },
            )
          }
        >
          Target
        </TableHeader>
        <TableHeader
          onClick={() => setSort('tool')}
          active={sort === 'tool'}
          start={[4, 1, 3, 3]}
          width={[3, 0, 3, 3]}
          sx={{ display: ['inherit', 'none', 'inherit', 'inherit'] }}
          expanded={expanded?.id === 'tool'}
          expander="tooltip"
          onExpand={() =>
            setExpanded(
              expanded?.id === 'tool'
                ? null
                : { id: 'tool', start: [3], width: [3] },
            )
          }
        >
          Tool
        </TableHeader>
        <TableHeader
          onClick={() => setSort('rock')}
          active={sort === 'rock'}
          start={[4, 4, 6, 6]}
          width={[1]}
          sx={{ display: ['none', 'inherit', 'inherit', 'inherit'] }}
          expanded={expanded?.id === 'coverage_rock'}
          onExpand={() =>
            setExpanded(
              expanded?.id === 'coverage_rock'
                ? null
                : { id: 'coverage_rock', color: 'purple' },
            )
          }
        >
          Rock
          <br />
          application
        </TableHeader>
        <TableHeader
          onClick={() => setSort('init_weathering')}
          active={sort === 'init_weathering'}
          start={[5, 5, 7, 7]}
          width={[1]}
          sx={{ display: ['none', 'inherit', 'inherit', 'inherit'] }}
          expanded={expanded?.id === 'coverage_initial_weathering'}
          onExpand={() =>
            setExpanded(
              expanded?.id === 'coverage_initial_weathering'
                ? null
                : { id: 'coverage_initial_weathering', color: 'grey' },
            )
          }
        >
          Initial
          <br />
          weathering
        </TableHeader>
        <TableHeader
          onClick={() => setSort('field')}
          active={sort === 'field'}
          start={[6, 6, 8, 8]}
          width={[1]}
          sx={{ display: ['none', 'inherit', 'inherit', 'inherit'] }}
          expanded={expanded?.id === 'coverage_field'}
          onExpand={() =>
            setExpanded(
              expanded?.id === 'coverage_field'
                ? null
                : { id: 'coverage_field', color: 'yellow' },
            )
          }
        >
          Field
          <br />
          processes
        </TableHeader>
        <TableHeader
          onClick={() => setSort('watershed')}
          active={sort === 'watershed'}
          start={[7, 7, 9, 9]}
          width={[1]}
          sx={{ display: ['none', 'inherit', 'inherit', 'inherit'] }}
          expanded={expanded?.id === 'coverage_watershed'}
          onExpand={() =>
            setExpanded(
              expanded?.id === 'coverage_watershed'
                ? null
                : { id: 'coverage_watershed', color: 'green' },
            )
          }
        >
          Watershed
          <br />
          transport
        </TableHeader>
        <TableHeader
          onClick={() => setSort('ocean')}
          active={sort === 'ocean'}
          start={[8, 8, 10, 10]}
          width={[1]}
          sx={{ display: ['none', 'inherit', 'inherit', 'inherit'] }}
          expanded={expanded?.id === 'coverage_ocean'}
          onExpand={() =>
            setExpanded(
              expanded?.id === 'coverage_ocean'
                ? null
                : { id: 'coverage_ocean', color: 'teal' },
            )
          }
        >
          Ocean
          <br />
          storage
        </TableHeader>

        <Column as="th" start={1} width={[6, 8, 10, 10]} sx={sx.reset}>
          <AnimateHeight
            duration={100}
            height={expanded ? 'auto' : 0}
            easing={'linear'}
          >
            <FadeIn>
              {expanded && expanded.start && (
                <Row columns={[6, 8, 10, 10]}>
                  <Column start={expanded.start} width={expanded.width}>
                    <TooltipContent expanded={!!expanded}>
                      {legend[expanded.id]}
                    </TooltipContent>
                  </Column>
                </Row>
              )}

              {expanded && !expanded.start && (
                <ExpandedRow
                  accent={[expanded.color]}
                  onClose={() => setExpanded(null)}
                  sx={{ mt: 3, mb: 0, bg: alpha(expanded.color, 0.2) }}
                >
                  <ExpandedColumn
                    label="Overview"
                    start={1}
                    width={[5, 5, 3, 3]}
                    sx={{ '& > div:first-of-type': { color: expanded.color } }}
                    mdx
                  >
                    {legend[expanded.id]}
                  </ExpandedColumn>

                  <ExpandedColumn
                    label="Coverage"
                    start={[1, 1, 4, 4]}
                    width={[5]}
                    sx={{
                      mt: [3, 3, 0, 0],
                      '& > div:first-of-type': { color: expanded.color },
                    }}
                  >
                    {['Essential', 'Primary', 'Secondary', 'Extra'].map(
                      (coverage) => (
                        <Row key={coverage} columns={[4]} sx={{ mb: 3 }}>
                          <Column start={1} width={1}>
                            <Badge sx={{ color: expanded.color }}>
                              {coverage}
                            </Badge>
                          </Column>
                          <Column start={[2]} width={[4]}>
                            {legend[coverage.toLowerCase()]}
                          </Column>
                        </Row>
                      ),
                    )}
                  </ExpandedColumn>
                </ExpandedRow>
              )}
            </FadeIn>
          </AnimateHeight>
        </Column>
      </Row>
    </Box>
  )
}

export default TableHead
