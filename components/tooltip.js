import { Box, Flex, IconButton } from 'theme-ui'
import { useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { Info } from '@carbonplan/icons'

export const TooltipButton = ({
  mt,
  expanded,
  setExpanded,
  color = 'secondary',
  sx,
}) => {
  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation()
        setExpanded(!expanded)
      }}
      role="checkbox"
      aria-checked={expanded}
      aria-label="Information"
      sx={{
        cursor: 'pointer',
        height: '16px',
        width: '16px',
        '@media (hover: hover) and (pointer: fine)': {
          '&:hover > #info': {
            stroke: 'primary',
          },
        },
        p: [0],
        transform: 'translate(0px, -3.75px)',
        mt,
        flexShrink: 0,
        ...sx,
      }}
    >
      <Info
        id="info"
        height="16px"
        width="16px"
        sx={{
          stroke: expanded ? 'primary' : color,
          transition: '0.1s',
        }}
      />
    </IconButton>
  )
}
export const TooltipWrapper = ({
  align,
  color,
  mt,
  justify,
  children,
  expanded,
  setExpanded,
}) => {
  return (
    <Flex sx={{ gap: 2, alignItems: align, justifyContent: justify }}>
      {children}
      <TooltipButton
        sx={{ mt }}
        expanded={expanded}
        setExpanded={setExpanded}
        color={color}
      />
    </Flex>
  )
}

export const TooltipContent = ({
  expanded,
  children,
  color = 'secondary',
  sx,
}) => {
  return (
    <AnimateHeight
      duration={100}
      height={expanded ? 'auto' : 0}
      easing={'linear'}
    >
      <Box
        sx={{
          py: 1,
          fontSize: [0, 0, 0, 1],
          color,
          fontFamily: 'body',
          letterSpacing: 'body',
          textTransform: 'none',
          ...sx,
        }}
      >
        {children}
      </Box>
    </AnimateHeight>
  )
}
const Tooltip = ({
  children,
  tooltip,
  color,
  mt = '6px',
  sx,
  align = 'flex-start',
  justify,
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Box sx={sx}>
      <TooltipWrapper
        expanded={expanded}
        setExpanded={setExpanded}
        align={align}
        justify={justify}
        mt={mt}
        color={color}
      >
        {children}
      </TooltipWrapper>
      <TooltipContent color={color} expanded={expanded}>
        {tooltip}
      </TooltipContent>
    </Box>
  )
}

export default Tooltip
