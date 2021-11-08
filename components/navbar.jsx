import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import styled from 'styled-components'
import { Button, Dropdown, Image, Menu } from 'semantic-ui-react'

const Navbar = () => {
  const router = useRouter()
  const [user, setUser] = useState()
  useEffect(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/auth/verifyToken`, {
          withCredentials: true,
        })
      setUser(res.data)
    } catch (err) {
      await router.push('/login')
    }
  }, [])

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API}/auth/logout`, {
        withCredentials: true,
      })
      await router.push('/login')
    } catch (err) {
      alert('로그아웃에 실패했습니다.')
      console.log(err)
    }
  }

  return (
    <NavbarWrapper>
      <NavbarInner>
        <NavbarMenu borderless>
          <Link href={'/'}>
            <Menu.Item position={'left'} style={{ paddingLeft: 0 }}>
              <span style={{ textAlign: 'center' }}>
                <Image
                  centered
                  src={'/popo.svg'} alt={'logo'}
                  size={'small'}/>
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
            <Menu.Item link disabled>게시물 관리</Menu.Item>
          </Link>
          <Link href={'/statistics'}>
            <Menu.Item link disabled>통계 보기</Menu.Item>
          </Link>
          <Menu.Item position={'right'}>
            {
              user ? (
                <>
                  <Dropdown item simple
                            text={`${user.name}`}>
                    <Dropdown.Menu style={{
                      border: 'none',
                      boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.2)',
                    }}>
                      <Dropdown.Item text={'로그아웃'} onClick={handleLogout}/>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <Button
                  href={'/login'}
                  style={{ border: 'none', background: 'none' }}
                >
                  로그인
                </Button>
              )
            }
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