import { useMemo, useState } from 'react'
import { Box } from 'theme-ui'

import data from '../data/QA.json'
import TableHead from './table-head'
import Body from './body'

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
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('target')

  const sortedData = useMemo(() => {
    const sorter = ['target', 'tool'].includes(sort)
      ? (a, b) => a[sort].localeCompare(b[sort])
      : (a, b) => b.coverage[sort] - a.coverage[sort]

    const filteredData = search
      ? data.filter((d) =>
          [
            d.quant_approach.target.toLowerCase(),
            d.quant_approach.tool.toLowerCase(),
          ].some((s) => s.includes(search.toLowerCase())),
        )
      : data

    return filteredData.map((d) => d.quant_approach).sort(sorter)
  }, [sort, search])

  return (
    <Box as="table" sx={sx.reset}>
      <TableHead
        sort={sort}
        setSort={setSort}
        search={search}
        setSearch={setSearch}
      />
      <Body data={sortedData} />
    </Box>
  )
}

export default Table
