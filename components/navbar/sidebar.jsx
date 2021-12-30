import Link from 'next/link'
import { Menu, Segment, Sidebar } from 'semantic-ui-react'

const SideBar = ({ visible, toggleSidebar, pushContent }) => {

  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        vertical
        animation="overlay"
        icon="labeled"
        width="thin"
        visible={visible}
        as={Menu}
        style={{ height: '100%' }}
        onHide={toggleSidebar}
      >
        <Link href={'/user'}>
          <Menu.Item
            style={{ zIndex: 5, marginTop: '5rem' }}
          >
            유저 관리
          </Menu.Item>
        </Link>
        <Link href={'/reservation'}>
          <Menu.Item as="a">
            예약 관리
          </Menu.Item>
        </Link>
        <Link href={'/introduce'}>
          <Menu.Item as="a">
            소개글 관리
          </Menu.Item>
        </Link>
        <Menu.Item as="a" disabled>
          게시물 관리
        </Menu.Item>
        <Link href={'/statistics'}>
          <Menu.Item as="a">
            통계 보기
          </Menu.Item>
        </Link>
      </Sidebar>

      <Sidebar.Pusher dimmed={visible}>
        {pushContent}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default SideBar