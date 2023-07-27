import { Row, Column } from '@carbonplan/components'

const Index = () => {
  return (
    <Row columns={[6, 8, 10, 10]}>
      <Column start={1} width={[6]}>
        TK: tool content
      </Column>
    </Row>
  )
}

export default Index
