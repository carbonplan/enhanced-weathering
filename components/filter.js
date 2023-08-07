import { useState } from 'react'
import { Flex, IconButton } from 'theme-ui'

import { Search } from '@carbonplan/icons'
import { Input } from '@carbonplan/components'

const Filter = ({ search, setSearch }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Flex
      sx={{
        borderStyle: 'solid',
        borderColor: 'muted',
        borderWidth: 0,
        borderBottomWidth: 1,
        justifyContent: 'flex-end',
        py: 2,
        height: 48,
      }}
    >
      <Flex sx={{ position: 'relative' }}>
        <IconButton
          aria-label="Search"
          sx={{
            cursor: 'pointer',
            position: 'absolute',
            [expanded ? 'left' : 'right']: 0,
          }}
          onClick={() => {
            if (expanded) {
              setExpanded(false)
              setSearch('')
            } else {
              setExpanded(true)
            }
          }}
        >
          <Search sx={{ width: 16, left: 0, stroke: 'secondary' }} />
        </IconButton>
        {expanded && (
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: '100%', pl: 30 }}
          />
        )}
      </Flex>
    </Flex>
  )
}

export default Filter
