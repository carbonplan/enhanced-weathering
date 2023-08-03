import { Badge, Column, Expander, Row } from '@carbonplan/components'
import { Triangle } from '@carbonplan/icons'
import { useMemo, useState } from 'react'
import { Box, Flex, IconButton } from 'theme-ui'

import data from '../data/QA.json'
import legend from '../data/legend.json'
import Entry from './entry'
import { TooltipButton, TooltipContent } from './tooltip'
import { ExpandedColumn, ExpandedRow } from './expanded'

const TableHead = ({
  info,
  expanded,
  expander = 'expander',
  onExpand,
  children,
  onClick,
  active,
  ...props
}) => {
  return (
    <Column as="th" {...props} sx={{ textAlign: 'left', fontSize: 0 }}>
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

const Table = () => {
  const [sort, setSort] = useState('target')
  const [tooltip, setTooltip] = useState(null)

  const sortedData = useMemo(() => {
    const sorter = ['target', 'tool'].includes(sort)
      ? (a, b) => a[sort].localeCompare(b[sort])
      : (a, b) => b.coverage[sort] - a.coverage[sort]
    return data.map((d) => d.quant_approach).sort(sorter)
  }, [sort])

  return (
    <Box as="table">
      <Box as="thead">
        <Row as="tr" columns={[6, 8, 10, 10]} sx={{ mb: 4 }}>
          <TableHead
            onClick={() => setSort('target')}
            active={sort === 'target'}
            start={1}
            width={[2]}
            expanded={tooltip?.id === 'target'}
            expander="tooltip"
            onExpand={() =>
              setTooltip(
                tooltip?.id === 'target'
                  ? null
                  : { id: 'target', start: 1, width: [2] },
              )
            }
          >
            Target
          </TableHead>
          <TableHead
            onClick={() => setSort('tool')}
            active={sort === 'tool'}
            start={[3]}
            width={[3]}
            expanded={tooltip?.id === 'tool'}
            expander="tooltip"
            onExpand={() =>
              setTooltip(
                tooltip?.id === 'tool'
                  ? null
                  : { id: 'tool', start: [3], width: [3] },
              )
            }
          >
            Tool
          </TableHead>
          <TableHead
            onClick={() => setSort('rock')}
            active={sort === 'rock'}
            start={[6]}
            width={[1]}
            expanded={tooltip?.id === 'coverage_rock'}
            onExpand={() =>
              setTooltip(
                tooltip?.id === 'coverage_rock'
                  ? null
                  : { id: 'coverage_rock', color: 'purple' },
              )
            }
          >
            Rock application
          </TableHead>
          <TableHead
            onClick={() => setSort('init_weathering')}
            active={sort === 'init_weathering'}
            start={[7]}
            width={[1]}
            expanded={tooltip?.id === 'coverage_initial_weathering'}
            onExpand={() =>
              setTooltip(
                tooltip?.id === 'coverage_initial_weathering'
                  ? null
                  : { id: 'coverage_initial_weathering', color: 'grey' },
              )
            }
          >
            Initial weathering
          </TableHead>
          <TableHead
            onClick={() => setSort('field')}
            active={sort === 'field'}
            start={[8]}
            width={[1]}
            expanded={tooltip?.id === 'coverage_field'}
            onExpand={() =>
              setTooltip(
                tooltip?.id === 'coverage_field'
                  ? null
                  : { id: 'coverage_field', color: 'yellow' },
              )
            }
          >
            Field processes
          </TableHead>
          <TableHead
            onClick={() => setSort('watershed')}
            active={sort === 'watershed'}
            start={[9]}
            width={[1]}
            expanded={tooltip?.id === 'coverage_watershed'}
            onExpand={() =>
              setTooltip(
                tooltip?.id === 'coverage_watershed'
                  ? null
                  : { id: 'coverage_watershed', color: 'green' },
              )
            }
          >
            Watershed transport
          </TableHead>
          <TableHead
            onClick={() => setSort('ocean')}
            active={sort === 'ocean'}
            start={[10]}
            width={[1]}
            expanded={tooltip?.id === 'coverage_ocean'}
            onExpand={() =>
              setTooltip(
                tooltip?.id === 'coverage_ocean'
                  ? null
                  : { id: 'coverage_ocean', color: 'teal' },
              )
            }
          >
            Ocean storage
          </TableHead>
          {!!tooltip &&
            (tooltip.start ? (
              <TableHead start={tooltip.start} width={tooltip.width}>
                <TooltipContent expanded={!!tooltip}>
                  {legend[tooltip.id]}
                </TooltipContent>
              </TableHead>
            ) : (
              <TableHead start={1} width={[6, 8, 10, 10]}>
                <ExpandedRow as="div">
                  <ExpandedColumn
                    as="div"
                    label="Overview"
                    start={1}
                    width={5}
                    mdx
                  >
                    {legend[tooltip.id]}
                  </ExpandedColumn>

                  <ExpandedColumn
                    as="div"
                    label="Coverage"
                    start={[6]}
                    width={[4]}
                  >
                    {['Essential', 'Primary', 'Secondary', 'Extra'].map(
                      (coverage) => (
                        <Row key={coverage} columns={[4]} sx={{ mb: 3 }}>
                          <Column start={1} width={1}>
                            <Badge sx={{ color: tooltip.color }}>
                              {coverage}
                            </Badge>
                          </Column>
                          <Column start={[2]} width={[3]}>
                            {legend[coverage.toLowerCase()]}
                          </Column>
                        </Row>
                      ),
                    )}
                  </ExpandedColumn>
                </ExpandedRow>
              </TableHead>
            ))}
        </Row>
      </Box>

      <Box as="tbody">
        {sortedData.map((d) => (
          <Entry key={`${d.target}-${d.tool}`} {...d} />
        ))}
      </Box>
    </Box>
  )
}

export default Table
