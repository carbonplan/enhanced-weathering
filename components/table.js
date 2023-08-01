import { Column, Row } from '@carbonplan/components'
import { Box } from 'theme-ui'

import data from '../data/QA.json'
import Coverage from './coverage'

const TableHead = ({ children, ...props }) => {
  return (
    <Column as="th" {...props} sx={{ textAlign: 'left', fontSize: 1 }}>
      {children}
    </Column>
  )
}

const TableRow = ({
  target,
  tool,
  coverage: { rock, init_weathering, field, watershed, ocean },
}) => {
  return (
    <Row as="tr" columns={[6, 8, 10, 10]} sx={{ my: 4 }}>
      <Column as="td" start={1} width={[2]}>
        {target}
      </Column>
      <Column as="td" start={[3]} width={[3]}>
        {tool}
      </Column>
      <Column start={[6]} width={[1]}>
        <Coverage type="rock" value={rock} />
      </Column>
      <Column start={[7]} width={[1]}>
        <Coverage type="init_weathering" value={init_weathering} />
      </Column>
      <Column start={[8]} width={[1]}>
        <Coverage type="field" value={field} />
      </Column>
      <Column start={[9]} width={[1]}>
        <Coverage type="watershed" value={watershed} />
      </Column>
      <Column start={[10]} width={[1]}>
        <Coverage type="ocean" value={ocean} />
      </Column>
    </Row>
  )
}

const Table = () => {
  return (
    <Box as="table">
      <Box as="thead">
        <Row as="tr" columns={[6, 8, 10, 10]}>
          <TableHead start={1} width={[2]}>
            Target
          </TableHead>
          <TableHead start={[3]} width={[3]}>
            Tool
          </TableHead>
          <TableHead start={[6]} width={[1]}>
            Rock application
          </TableHead>
          <TableHead start={[7]} width={[1]}>
            Initial weathering
          </TableHead>
          <TableHead start={[8]} width={[1]}>
            Field processes
          </TableHead>
          <TableHead start={[9]} width={[1]}>
            Watershed transport
          </TableHead>
          <TableHead start={[10]} width={[1]}>
            Ocean storage
          </TableHead>
        </Row>
      </Box>

      <Box as="tbody">
        {data.map((d) => (
          <TableRow
            key={`${d.quant_approach.target}-${d.quant_approach.tool}`}
            {...d.quant_approach}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Table
