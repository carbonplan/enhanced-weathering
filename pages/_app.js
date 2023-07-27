import { ThemeProvider } from 'theme-ui'
import '@carbonplan/components/fonts.css'
import '@carbonplan/components/globals.css'
import theme from '@carbonplan/theme'
import { Tool } from '@carbonplan/layouts'

const meta = {
  title: 'Quantifying enhanced weathering',
  card: 'TK',
  path: 'TK',
  color: 'grey',
  quickLook: 'TK',
  summary: 'TK',
}

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Tool
        meta={meta}
        description="TK: tool description"
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
