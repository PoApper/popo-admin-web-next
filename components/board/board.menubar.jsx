import React, { Component } from 'react'
import Link from 'next/link'
import { Menu } from 'semantic-ui-react'

export default class BoardMenubar extends Component {
  render () {
    return (
      <Menu>
        <Link href={'/board/whitebook'} passHref>
          <Menu.Item>
            생활백서
          </Menu.Item>
        </Link>
        <Menu.Item disabled>
          총학생회 게시물
        </Menu.Item>
        <Menu.Item disabled>
          동아리 게시물
        </Menu.Item>
      </Menu>
    )
  }
}