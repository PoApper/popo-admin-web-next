import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Icon, Input, Pagination } from 'semantic-ui-react'
import LayoutMain from '../components/layout.main'
import UserTable from '../components/user/user.table'
import UserCreateModal from '../components/user/user.create.modal'

const UserPage = () => {
  const PAGE_SIZE = 10

  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)

  const [total_count, setTotalCount] = useState(0)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const skip = PAGE_SIZE * (page - 1);
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/search/user?q=${keyword}&take=${PAGE_SIZE}&skip=${skip}`,
      { withCredentials: true })
      .then((res) => {
        const ret = res.data;
        setUsers(ret['users'])
        setTotalCount(ret['count'])
      })
  }, [keyword, page])

  return (
    <LayoutMain>
      <h2>유저 관리</h2>

      <div style={{ marginBottom: '1rem' }}>
        <UserCreateModal
          trigger={<Button>유저 생성</Button>}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <Input
          icon={<Icon name='search' inverted circular link />}
          style={{width: 300}}
          placeholder={'찾으려는 유저를 검색하세요...'}
          onChange={(_, {value}) => setKeyword(value)}
        />
      </div>

      <p>
        유저는 마지막 로그인 순으로 정렬되어 표시됩니다.
      </p>

      <div>
        <UserTable
          users={users}
          startIdx={(page - 1) * PAGE_SIZE}
        />
        <div style={{ display: 'flex' }}>
          <Pagination
            style={{ margin: '0 auto' }}
            activePage={page}
            totalPages={Math.ceil(total_count / PAGE_SIZE)}
            prevItem={null} nextItem={null}
            onPageChange={(_, {activePage}) => setPage(activePage)}
          />
        </div>
      </div>
    </LayoutMain>
  )
}

export default UserPage