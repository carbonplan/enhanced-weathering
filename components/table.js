import { Column, Row } from '@carbonplan/components'
import { Box, Flex } from 'theme-ui'

import data from '../data/QA.json'
import Entry from './entry'

const TableHead = ({ children, ...props }) => {
  return (
    <Column as="th" {...props} sx={{ textAlign: 'left', fontSize: 0 }}>
      <Flex
        sx={{
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        {children}
      </Flex>
    </Column>
  )
}

const Table = () => {
  return (
    <Box as="table">
      <Box as="thead">
        <Row as="tr" columns={[6, 8, 10, 10]} sx={{ mb: 4 }}>
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
          <Entry
            key={`${d.quant_approach.target}-${d.quant_approach.tool}`}
            {...d.quant_approach}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Table
