import { Row, Column } from '@carbonplan/components'
import Table from '../components/table'

const Index = () => {
  return (
    <Row columns={[6, 8, 10, 10]}>
      <Column start={1} width={[6, 8, 10, 10]}>
        <Table />
      </Column>
    </Row>
  )
}

export default Index
