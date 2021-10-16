import Layout from '../components/layout'
import UserTable from '../components/user/user.table'

const UserPage = () => {
  return (
    <Layout>
      <h2>유저 관리</h2>
      유저 생성 모달 여기
      <div>
        <UserTable/>
      </div>
    </Layout>
  )
}

export default UserPage