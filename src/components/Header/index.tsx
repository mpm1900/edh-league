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
import { useSeasons } from '../../state/seasons'

export interface HeaderT {
  checkin?: boolean
  showSeasons?: boolean
  showHome?: boolean
}
export const Header = (props: HeaderT) => {
  const { checkin, showSeasons, showHome } = props
  const modalContext = useModalContext()
  const seasons = useSeasons()
  const handleClick = () => {
    modalContext.open(<CheckInForm />)
  }
  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem
          $style={{
            color: 'white',
            fontWeight: 'bold',
            height: '48px',
            lineHeight: '48px',
          }}
        >
          LCL
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
        {showHome && seasons.length > 0 && (
          <StyledNavigationItem>
            <StyledLink href='/'>Home</StyledLink>
          </StyledNavigationItem>
        )}
        {showSeasons && (
          <StyledNavigationItem>
            <StyledLink href='/seasons'>Seasons</StyledLink>
          </StyledNavigationItem>
        )}
        <StyledNavigationItem>
          <StyledLink href='#'>Manage Players</StyledLink>
        </StyledNavigationItem>
        <StyledNavigationItem>
          <StyledLink href='#'>Manage Decks</StyledLink>
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.right}>
        {checkin && seasons.length > 0 && (
          <StyledNavigationItem>
            <Button $style={{ marginRight: '24px' }} onClick={handleClick}>
              Check In
            </Button>
          </StyledNavigationItem>
        )}
      </StyledNavigationList>
    </HeaderNavigation>
  )
}
