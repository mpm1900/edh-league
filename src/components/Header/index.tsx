import React from 'react'
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from 'baseui/header-navigation'
import { StyledLink } from 'baseui/link'
import { Button } from 'baseui/button'
import { useModalContext } from '../../contexts/ModalContext'
import { CheckInForm } from '../CheckInForm'

export const Header = () => {
  const modalContext = useModalContext()
  const handleClick = () => {
    modalContext.open(<CheckInForm />)
  }
  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem $style={{ color: 'white', fontWeight: 'bold' }}>
          LCL
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <StyledLink href='#'>Seasons</StyledLink>
        </StyledNavigationItem>
        <StyledNavigationItem>
          <StyledLink href='#'>Manage Players</StyledLink>
        </StyledNavigationItem>
        <StyledNavigationItem>
          <StyledLink href='#'>Manage Decks</StyledLink>
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <Button $style={{ marginRight: '24px' }} onClick={handleClick}>
            Check In
          </Button>
        </StyledNavigationItem>
      </StyledNavigationList>
    </HeaderNavigation>
  )
}
