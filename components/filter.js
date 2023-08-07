import { useEffect, useRef, useState } from 'react'
import { Flex, IconButton } from 'theme-ui'

import { Search } from '@carbonplan/icons'
import { Column, Input, Row } from '@carbonplan/components'

const Filter = ({ search, setSearch }) => {
  const input = useRef(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (expanded) {
      input.current.focus()
    }
  }, [expanded])

  return (
    <Column
      as="th"
      start={1}
      width={[6, 8, 10, 10]}
      sx={{
        textAlign: 'left',
        fontSize: [0, 0, 0, 1],
        borderStyle: 'solid',
        borderColor: 'muted',
        borderWidth: 0,
        borderBottomWidth: 1,
        justifyContent: 'flex-end',
        pt: [2, 2, 2, 3],
        pb: [1, 1, 1, 2],
      }}
    >
      <Row columns={[6, 8, 10, 10]}>
        <Column
          start={[1, 5, 8, 9]}
          width={[6, 4, 3, 2]}
          sx={{ position: 'relative', minHeight: 34 }}
        >
          <IconButton
            aria-label="Search"
            sx={{
              top: 0,
              cursor: 'pointer',
              position: 'absolute',
              ...(expanded ? { left: -30 } : { right: 0 }),
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
              ref={input}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: '100%' }}
            />
          )}
        </Column>
      </Row>
    </Column>
  )
}

export default Filter
