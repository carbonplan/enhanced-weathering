import { Box } from 'theme-ui'

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

const Body = ({ data }) => {
  return (
    <Box as="tbody" sx={sx.reset}>
      {data.map((d, i) => (
        <Entry key={`${d.target}-${d.tool}`} border={i > 0} {...d} />
      ))}
    </Box>
  )
}

export default Body
