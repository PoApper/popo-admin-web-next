import React, { useState } from 'react'
import Head from 'next/head'
import styled, { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import { useMediaQuery } from 'react-responsive'
import NavbarDesktop from './navbar/navbar.desktop'
import NavbarMobile from './navbar/navbar.mobile'
import SideBar from './navbar/sidebar'

const LayoutMain = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 845 })
  const [SidebarVisible, setSidebarVisible] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>POPO 관리자페이지</title>
        <meta name="description" content="POPO 관리자 페이지"/>
        <link rel="icon" href={'/favicon.ico'}/>
      </Head>
      <>
        <main>
          {
            isMobile ? (
              <>
                <NavbarMobile
                  toggleSidebar={() => setSidebarVisible(!SidebarVisible)}
                />
                <SideBar
                  visible={SidebarVisible}
                  toggleSidebar={() => setSidebarVisible(!SidebarVisible)}
                  pushContent={
                    <Wrapper>
                      <div style={{ width: '100%' }}>
                        {children}
                      </div>
                    </Wrapper>
                  }/>
              </>
            ) : (
              <>
                <NavbarDesktop/>
                <Wrapper>
                  <div style={{ width: '100%' }}>
                    {children}
                  </div>
                </Wrapper>
              </>
            )
          }
        </main>
      </>
    </ThemeProvider>
  )
}

const Wrapper = styled.div`
  height: 100%;
  min-height: calc(100vh);
  max-width: ${({ theme }) => theme.contentWidth};
  padding: 8rem 1rem 2rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default LayoutMain