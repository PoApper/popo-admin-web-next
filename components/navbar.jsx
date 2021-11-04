import Link from 'next/link'
import styled from 'styled-components'
import { Image, Menu } from 'semantic-ui-react'

const Navbar = () => {
  return (
    <NavbarWrapper>
      <NavbarInner>
        <NavbarMenu borderless>
          <Link href={'/'}>
            <Menu.Item position={'left'} style={{paddingLeft: 0}}>
              <span style={{textAlign: "center"}}>
                <Image centered src={'/popo.svg'} size={'small'}/>
                Postechian&apos;s Portal
              </span>
              <AdminSite>
                관리자
              </AdminSite>
            </Menu.Item>
          </Link>
          <Link href={'/user'}>
            <Menu.Item link>유저 관리</Menu.Item>
          </Link>
          <Link href={'/reservation'}>
            <Menu.Item link>예약 관리</Menu.Item>
          </Link>
          <Link href={'/introduce'}>
            <Menu.Item link>소개글 관리</Menu.Item>
          </Link>
          <Link href={'/board'}>
            <Menu.Item link>게시물 관리</Menu.Item>
          </Link>
          <Link href={'/statistics'}>
            <Menu.Item link>통계 보기</Menu.Item>
          </Link>
          <Menu.Item position={'right'}>
            로그인
          </Menu.Item>
        </NavbarMenu>
      </NavbarInner>
    </NavbarWrapper>
  )
}

export default Navbar

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

const AdminSite = styled.h2`
  border-left: 2px solid rgba(119, 136, 153, 0.5);
  margin: 0 auto;
  padding-left: 12px;

`