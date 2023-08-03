import { Badge, Column, Expander, Row } from '@carbonplan/components'
import { Triangle } from '@carbonplan/icons'
import { useState } from 'react'
import { Box, Flex, IconButton } from 'theme-ui'

import legend from '../data/legend.json'
import { TooltipButton, TooltipContent } from './tooltip'
import { ExpandedColumn, ExpandedRow } from './expanded'

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
      sx={{ textAlign: 'left', fontSize: 0, mb: 4, ...sx }}
    >
      <Flex
        sx={{
          height: '100%',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        {onClick && (
          <IconButton
            sx={{
              p: 0,
              width: 10,
              '&:hover svg': { stroke: 'primary' },
              cursor: 'pointer',
            }}
            onClick={onClick}
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
          sx={{
            gap: expander === 'expander' ? 1 : 2,
            alignItems: 'flex-end',
            flexDirection: expander === 'expander' ? 'row' : 'row-reverse',
          }}
        >
          {onExpand &&
            (expander === 'expander' ? (
              <Expander
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
                expanded={expanded}
                setExpanded={onExpand}
                sx={{ mb: -1 }}
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
        }}
      >
        <TableHeader
          onClick={() => setSort('target')}
          active={sort === 'target'}
          start={1}
          width={[2]}
          expanded={expanded?.id === 'target'}
          expander="expanded"
          onExpand={() =>
            setExpanded(
              expanded?.id === 'target'
                ? null
                : { id: 'target', start: 1, width: [2] },
            )
          }
        >
          Target
        </TableHeader>
        <TableHeader
          onClick={() => setSort('tool')}
          active={sort === 'tool'}
          start={[3]}
          width={[3]}
          expanded={expanded?.id === 'tool'}
          expander="expanded"
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
          start={[6]}
          width={[1]}
          expanded={expanded?.id === 'coverage_rock'}
          onExpand={() =>
            setExpanded(
              expanded?.id === 'coverage_rock'
                ? null
                : { id: 'coverage_rock', color: 'purple' },
            )
          }
        >
          Rock application
        </TableHeader>
        <TableHeader
          onClick={() => setSort('init_weathering')}
          active={sort === 'init_weathering'}
          start={[7]}
          width={[1]}
          expanded={expanded?.id === 'coverage_initial_weathering'}
          onExpand={() =>
            setExpanded(
              expanded?.id === 'coverage_initial_weathering'
                ? null
                : { id: 'coverage_initial_weathering', color: 'grey' },
            )
          }
        >
          Initial weathering
        </TableHeader>
        <TableHeader
          onClick={() => setSort('field')}
          active={sort === 'field'}
          start={[8]}
          width={[1]}
          expanded={expanded?.id === 'coverage_field'}
          onExpand={() =>
            setExpanded(
              expanded?.id === 'coverage_field'
                ? null
                : { id: 'coverage_field', color: 'yellow' },
            )
          }
        >
          Field processes
        </TableHeader>
        <TableHeader
          onClick={() => setSort('watershed')}
          active={sort === 'watershed'}
          start={[9]}
          width={[1]}
          expanded={expanded?.id === 'coverage_watershed'}
          onExpand={() =>
            setExpanded(
              expanded?.id === 'coverage_watershed'
                ? null
                : { id: 'coverage_watershed', color: 'green' },
            )
          }
        >
          Watershed transport
        </TableHeader>
        <TableHeader
          onClick={() => setSort('ocean')}
          active={sort === 'ocean'}
          start={[10]}
          width={[1]}
          expanded={expanded?.id === 'coverage_ocean'}
          onExpand={() =>
            setExpanded(
              expanded?.id === 'coverage_ocean'
                ? null
                : { id: 'coverage_ocean', color: 'teal' },
            )
          }
        >
          Ocean storage
        </TableHeader>
        {!!expanded &&
          (expanded.start ? (
            <TableHeader start={expanded.start} width={expanded.width}>
              <TooltipContent expanded={!!expanded}>
                {legend[expanded.id]}
              </TooltipContent>
            </TableHeader>
          ) : (
            <TableHeader start={1} width={[6, 8, 10, 10]} sx={{ mb: 0 }}>
              <ExpandedRow
                as="div"
                accent={[expanded.color]}
                onClose={() => setExpanded(null)}
                // sx={{ mt: 3 }}
              >
                <ExpandedColumn
                  as="div"
                  label="Overview"
                  start={1}
                  width={3}
                  mdx
                >
                  {legend[expanded.id]}
                </ExpandedColumn>

                <ExpandedColumn
                  as="div"
                  label="Coverage"
                  start={[4]}
                  width={[5]}
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
            </TableHeader>
          ))}
      </Row>
    </Box>
  )
}

export default TableHead
