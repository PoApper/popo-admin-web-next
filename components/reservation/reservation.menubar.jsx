import React, {Component} from 'react';
import Link from 'next/link'
import {Menu} from "semantic-ui-react";

export default class ReservationMenubar extends Component {
  render() {
    return (
      <Menu>
        <Link href={"/reservation/placeList"}>
          <Menu.Item>
            장소 목록
          </Menu.Item>
        </Link>
        <Link href={"/reservation/place"}>
          <Menu.Item>
            장소 예약
          </Menu.Item>
        </Link>
        <Link href={"/reservation/equipList"}>
          <Menu.Item>
            장비 목록
          </Menu.Item>
        </Link>
        <Link href={"/reservation/equip"}>
          <Menu.Item>
            장비 예약
          </Menu.Item>
        </Link>
      </Menu>
    )
  }
}