import { Table } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const userTypes = {
  'STUDENT': '학생',
  'FACULTY': '교직원',
  'CLUB': '동아리',
  'ASSOCIATION': '학생단체',
  'ADMIN': '관리자',
  'STAFF': 'Staff',
  'OTHERS': 'OTHERS',
}

const UserTable = () => {
  const [users, setUsers] = useState([])

  useEffect(async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/user`,
        { withCredentials: true })
      setUsers(res.data)
    } catch (err) {
      alert('유저 목록을 불러오는데 실패했습니다.')
      console.log(err)
    }
  })

  return (
    <Table
      celled selectable
      textAlign={'center'} color={'orange'}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>idx.</Table.HeaderCell>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>이름</Table.HeaderCell>
          <Table.HeaderCell>유저 타입</Table.HeaderCell>
          <Table.HeaderCell>유저 상태</Table.HeaderCell>
          <Table.HeaderCell>가입일</Table.HeaderCell>
          <Table.HeaderCell>마지막 로그인</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          users.map((user, idx) => {
            return (
              <Table.Row>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{userTypes[user.userType]}</Table.Cell>
                <Table.Cell>{moment(user.createdAt).format("YYYY년 MM월 DD일 HH:mm")}</Table.Cell>
                <Table.Cell>{moment(user.lastLoginAt).format("YYYY년 MM월 DD일 HH:mm")}</Table.Cell>
              </Table.Row>
            )
          })
        }
      </Table.Body>
    </Table>
  )
}

export default UserTable