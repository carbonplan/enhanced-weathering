import { Row, Column } from '@carbonplan/components'
import { Box, Divider } from 'theme-ui'
import { useThemedStylesWithMdx } from '@theme-ui/mdx'
import { MDXProvider, useMDXComponents } from '@mdx-js/react'

import Table from '../components/table'
import About from '../components/about.md'
import Methods from '../components/methods.md'

const Index = () => {
  const components = useThemedStylesWithMdx(useMDXComponents())

  return (
    <>
      <Row columns={[6, 8, 10, 10]}>
        <Column start={1} width={[6, 8, 10, 10]}>
          <Table />
        </Column>
      </Row>
      <Divider sx={{ mt: [6, 7, 8, 9] }} />
      <MDXProvider components={components}>
        <Row columns={[6, 8, 10, 10]}>
          <Column start={[1]} width={[6, 4, 5, 5]}>
            <Box as="h2" variant="styles.h2">
              About
            </Box>
            <About />
          </Column>
          <Column start={[1, 5, 6, 6]} width={[6, 4, 5, 5]}>
            <Box as="h2" variant="styles.h2">
              Content
            </Box>
            <Methods />
          </Column>
        </Row>
      </MDXProvider>
    </>
  )
}

export default Index
