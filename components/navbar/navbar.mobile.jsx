import { Icon, Image, Menu } from 'semantic-ui-react'
import styled from 'styled-components'
import Link from 'next/link'

const NavbarMobile = ({ toggleSidebar }) => {
  return (
    <NavbarWrapper>
      <div style={{backgroundColor: "black", textAlign: "center", color: "white"}}>
        관리자
      </div>
      <NavbarInner>
        <NavbarMenu borderless>
          <Menu.Item
            position={"left"}
            onClick={toggleSidebar}>
            <Icon name={'sidebar'}/>
          </Menu.Item>
          <Link href={'/'}>
            <Menu.Item>
              <div style={{ display: 'flex', alignItems: 'center', textAlign: "center" }}>
                <Image
                  src={'/popo.svg'} alt={'logo'}
                  size={'tiny'}
                  style={{margin: 'rgba(255, 255, 255, 0.7)'}}
                />
              </div>
            </Menu.Item>
          </Link>
          <Menu.Item
            position={"right"}
          >
            <Icon name={'user'}/>
          </Menu.Item>
        </NavbarMenu>
      </NavbarInner>
    </NavbarWrapper>
  )
}

export default NavbarMobile

const NavbarWrapper = styled.nav`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;

  font-weight: bold;
  width: 100%;

  position: fixed;
  top: 0;
  z-index: 10;
`

const NavbarInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;

  max-width: ${({
    theme,
  }) => theme.contentWidth
  };
`

const NavbarMenu = styled(Menu)`
  box-shadow: none !important;
  border: none !important;
  width: 100%;
`