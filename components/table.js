import { useMemo, useState } from 'react'
import { Box } from 'theme-ui'

import data from '../data/QA.json'
import TableHead from './table-head'
import Entry from './entry'

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
    <Box as="table" sx={sx.reset}>
      <TableHead sort={sort} setSort={setSort} />

      <Box as="tbody" sx={sx.reset}>
        {sortedData.map((d, i) => (
          <Entry key={`${d.target}-${d.tool}`} border={i > 0} {...d} />
        ))}
      </Box>
    </Box>
  )
}

export default Table
