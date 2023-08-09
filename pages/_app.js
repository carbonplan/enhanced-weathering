import { ThemeProvider } from 'theme-ui'
import '@carbonplan/components/fonts.css'
import '@carbonplan/components/globals.css'
import theme from '@carbonplan/theme'
import { Tool } from '@carbonplan/layouts'
import { Link } from '@carbonplan/components'

const meta = {
  title: 'Quantifying enhanced weathering',
  card: 'TK',
  path: 'TK',
  color: 'grey',
  quickLook:
    'A resource for exploring different tools that could be used in enhanced weathering MRV',
  summary: 'TK',
}

const description = (
  <>
    Below, you can explore what kinds of tools — e.g. measurements, models, or
    records — might play a role in quantifying net carbon removal from enhanced
    weathering. Read more in the accompanying{' '}
    <Link href="https://drafts.carbonplan.org/research/ew-quantification-explainer">
      explainer
    </Link>
    .
  </>
)

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Tool
        meta={meta}
        description={description}
        contentWidth={[6, 8, 10, 10]}
        descriptionWidth={[6, 7, 7, 7]}
        quickLookStart={9}
      >
        <Component {...pageProps} />
      </Tool>
    </ThemeProvider>
  )
}

export default App
