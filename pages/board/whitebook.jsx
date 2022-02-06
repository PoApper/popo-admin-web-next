import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'semantic-ui-react'
import BoardLayout from '../../components/board/board.layout'
import WhitebookCreateModal from '../../components/board/whitebook.create.modal'
import WhitebookTable from '../../components/board/whitebook.table'

const WhitebookPage = () => {
  const [whitebooks, setWhitebooks] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/whitebook`).
      then((res) => setWhitebooks(res.data)).
      catch((err) => {
        alert('생활백서 목록을 불러오는데 실패했습니다.')
        console.log(err)
      })
  }, [])

  return (
    <BoardLayout>
      <h3>생활백서</h3>
      <div style={{ marginBottom: '1rem' }}>
        <WhitebookCreateModal
          trigger={<Button>생활백서 생성</Button>}
        />
      </div>
      <p>생활백서는 업데이트 순서로 정렬되어 표시됩니다!</p>
      <div>
        <WhitebookTable
          whitebooks={whitebooks}
        />
      </div>
    </BoardLayout>
  )
}

export default WhitebookPage