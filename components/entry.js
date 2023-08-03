import { Button, Column, Expander, Row } from '@carbonplan/components'
import { Flex } from 'theme-ui'
import { useState } from 'react'
import { RotatingArrow } from '@carbonplan/icons'

import Coverage from './coverage'
import { ExpandedColumn, ExpandedRow } from './expanded'

const Entry = ({
  target,
  tool,
  coverage: { rock, init_weathering, field, watershed, ocean },
  transient,
  type,
  category,
  impacts,
  notes,
  comments,
  references,
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <Row
        as="tr"
        columns={[6, 8, 10, 10]}
        onClick={() => setExpanded(!expanded)}
        sx={{
          py: 4,
          cursor: 'pointer',
          '&:hover button': { stroke: 'primary' },
          borderStyle: 'solid',
          borderColor: 'muted',
          borderWidth: 0,
          borderBottomWidth: 1,
        }}
      >
        <Column as="td" start={1} width={[2]} sx={{ position: 'relative' }}>
          <Expander
            value={expanded}
            sx={{
              position: 'absolute',
              left: -26,
              width: '18px',
              height: '18px',
            }}
            onClick={() => setExpanded(!expanded)}
          />
          {target}
        </Column>
        <Column as="td" start={[3]} width={[3]}>
          {tool}
        </Column>
        <Column as="td" start={[6]} width={[1]}>
          <Coverage type="rock" value={rock} />
        </Column>
        <Column as="td" start={[7]} width={[1]}>
          <Coverage type="init_weathering" value={init_weathering} />
        </Column>
        <Column as="td" start={[8]} width={[1]}>
          <Coverage type="field" value={field} />
        </Column>
        <Column as="td" start={[9]} width={[1]}>
          <Coverage type="watershed" value={watershed} />
        </Column>
        <Column as="td" start={[10]} width={[1]}>
          <Coverage type="ocean" value={ocean} />
        </Column>
      </Row>
      {expanded && (
        <ExpandedRow onClose={() => setExpanded(false)}>
          <ExpandedColumn start={1} width={[2]} label="Transient">
            {transient}
          </ExpandedColumn>
          <ExpandedColumn start={[3]} width={[2]} label="Type">
            {type}
          </ExpandedColumn>
          <ExpandedColumn start={[5]} width={[2]} label="Category">
            {category}
          </ExpandedColumn>
          <ExpandedColumn start={[7]} width={[2]} label="Impacts">
            {impacts}
          </ExpandedColumn>
          <ExpandedColumn
            start={1}
            width={[4]}
            label="Notes"
            sx={{ mt: 5 }}
            mdx
          >
            {notes}
          </ExpandedColumn>

          <Column as="td" start={[6]} width={[4]}>
            <Row columns={[4]}>
              <ExpandedColumn
                start={[1]}
                width={[4]}
                label="Comments"
                as="div"
                mdx
                sx={{ mt: 5 }}
              >
                {comments}
              </ExpandedColumn>
              {references.length > 0 && (
                <ExpandedColumn
                  start={[1]}
                  width={[4]}
                  label="References"
                  as="div"
                  sx={{ mt: 5 }}
                >
                  <Flex sx={{ flexDirection: 'column', gap: 2 }}>
                    {references.map(({ name, href }) => (
                      <Button key={name} href={href} suffix={<RotatingArrow />}>
                        {name}
                      </Button>
                    ))}
                  </Flex>
                </ExpandedColumn>
              )}
            </Row>
          </Column>
        </ExpandedRow>
      )}
    </>
  )
}

export default Entry
