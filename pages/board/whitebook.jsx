import { Button } from 'semantic-ui-react'

import BoardLayout from '@/components/board/board.layout'
import WhitebookCreateModal from '@/components/board/whitebook.create.modal'
import WhitebookTable from '@/components/board/whitebook.table'
import { PoPoAxios } from '@/utils/axios.instance';

const WhitebookPage = ({ whitebookList }) => {
  return (
    <BoardLayout>
      <h3>생활백서</h3>
      <div style={{ marginBottom: '1rem' }}>
        <WhitebookCreateModal
          trigger={<Button>생활백서 생성</Button>}
        />
      </div>
      <p>생활백서는 조회순으로 정렬되어 표시됩니다!</p>
      <div>
        <WhitebookTable
          whitebooks={whitebookList}
        />
      </div>
    </BoardLayout>
  )
}

export default WhitebookPage;

export async function getServerSideProps() {
  const res = await PoPoAxios.get(
    'whitebook/with-login?orderBy=click_count',
    { withCredentials: true }
  );
  const whitebookList = res.data;

  return { props: { whitebookList } };
}
