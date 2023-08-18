import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
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
  const router = useRouter()
  const [active, setActive] = useState(null)
  const [sort, setSort] = useState('target')

  useEffect(() => {
    if (router.query?.variable && router.query?.method) {
      const result = data.find(
        (d) =>
          d.quant_approach.target === router.query.variable &&
          d.quant_approach.tool === router.query.method,
      )
      if (result) {
        setActive(result.quant_approach)
      }
    }
  }, [router.query?.variable])

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
          <Entry
            key={`${d.target}-${d.tool}`}
            active={d.target === active?.target && d.tool === active?.tool}
            border={i > 0}
            {...d}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Table
