import { Column, Row } from '@carbonplan/components'
import { Triangle } from '@carbonplan/icons'
import { useMemo, useState } from 'react'
import { Box, Flex, IconButton } from 'theme-ui'

import data from '../data/QA.json'
import Entry from './entry'

const TableHead = ({ children, onClick, active, ...props }) => {
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

        {children}
      </Flex>
    </Column>
  )
}

const Table = () => {
  const [sort, setSort] = useState('target')

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
          >
            Target
          </TableHead>
          <TableHead
            onClick={() => setSort('tool')}
            active={sort === 'tool'}
            start={[3]}
            width={[3]}
          >
            Tool
          </TableHead>
          <TableHead
            onClick={() => setSort('rock')}
            active={sort === 'rock'}
            start={[6]}
            width={[1]}
          >
            Rock application
          </TableHead>
          <TableHead
            onClick={() => setSort('init_weathering')}
            active={sort === 'init_weathering'}
            start={[7]}
            width={[1]}
          >
            Initial weathering
          </TableHead>
          <TableHead
            onClick={() => setSort('field')}
            active={sort === 'field'}
            start={[8]}
            width={[1]}
          >
            Field processes
          </TableHead>
          <TableHead
            onClick={() => setSort('watershed')}
            active={sort === 'watershed'}
            start={[9]}
            width={[1]}
          >
            Watershed transport
          </TableHead>
          <TableHead
            onClick={() => setSort('ocean')}
            active={sort === 'ocean'}
            start={[10]}
            width={[1]}
          >
            Ocean storage
          </TableHead>
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
