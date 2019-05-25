import { styled } from 'baseui'

export const FlexContainer = styled('div', ({$theme, $dir = 'row'}) => ({
    display: 'flex',
    flexDirection: $dir,
}))

export const FlexFullContainer = styled(FlexContainer, ({$theme}) => ({
    flex: 1,
}))