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
  quickLook: 'TK',
  summary: 'TK',
}

const description = (
  <>
    This resource allows users to explore what kinds of quantification tools
    might play a role in estimating carbon removal from enhanced weathering on
    agricultural soils. It is designed to help a wider community interpret and
    evaluate proposed approaches to enhanced weathering MRV. Read more in the
    accompanying <Link href="TK">explainer</Link>.
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
