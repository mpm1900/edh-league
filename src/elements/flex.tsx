import { styled, useStyletron } from 'baseui'

export const Flex = styled('div', ({ $dir }: any) => ({
  display: 'flex',
  flexDirection: $dir === 'row' ? 'row' : 'column',
}))
