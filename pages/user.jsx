import { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/layout'
import UserTable from '../components/user/user.table'

const UserPage = () => {
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
    <Layout>
      <h2>유저 관리</h2>
      <p>
        유저는 마지막 로그인 순으로 정렬되어 표시됩니다!
      </p>
      <div>
        <UserTable users={users}/>
      </div>
    </Layout>
  )
}

export default UserPage