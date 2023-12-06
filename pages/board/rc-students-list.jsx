import BoardLayout from '@/components/board/board.layout'
import { PoPoAxios } from '@/utils/axios.instance';
import CsvUploadForm from '@/components/common/csv-upload.form';
import { Button } from 'semantic-ui-react';

const RcStudentsListPage = ({ popoRcStdntCnt, totalRcStdntCnt }) => {
  return (
    <BoardLayout>
      <h3>RC 사생 명단 업로드</h3>
      <div>
        RC 사생에게만 RC 장소 예약을 받기 위해 RC 사생 명단 정보가 필요합니다.
        아래 주소에서 CSV 파일을 다운 받아 요 형식에 맞춰 입력 후, 다시 CSV 파일을 업로드 해주세요.
        CSV 파일이 업로드 되면, RC 사생 명단 초기화 후 업로드 된 명단에 있는 Povis ID를 가진 모든 유저를 RC 사생으로 분류합니다.
        만약 RC 사생 명단 업로드 후에 RC 사생이 추가로 가입한다면, 자동으로 RC 사생으로 분류됩니다.
      </div>

      <div style={{marginTop: 4}}>
        <ul>
          <li>
            POPO 가입 RC 사생 수: {popoRcStdntCnt}명 ({Number((popoRcStdntCnt / totalRcStdntCnt * 100).toFixed(1))}%) 
          </li>
          <li>
            전체 RC 사생 수: {totalRcStdntCnt}명            
          </li>
        </ul>
      </div>
      
      <div style={{marginTop: 4, gap: 8}}>
        <Button
          size='tiny'
          href={`${PoPoAxios.getUri()}/setting/download-rc-students-list`}
        >
          CSV 다운로드
        </Button>
        
        <Button
          size='tiny'
          href={`${PoPoAxios.getUri()}/setting/sync-rc-students-list`}
        >
          RC 사생 명단 Sync
        </Button>
      </div>

      <div style={{marginTop: 4}}>
        <CsvUploadForm
          label={'RC 사생 명단'}
          uploadUri={'/setting/rc-students-list'}
        />
      </div>
    </BoardLayout>
  )
}

export default RcStudentsListPage;

export async function getServerSideProps() {
  const res1 = await PoPoAxios.get('/user/count/RC_STUDENT');
  const popoRcStdntCnt = res1.data;
  
  const res2 = await PoPoAxios.get('/setting/count-rc-student-list');
  const totalRcStdntCnt = res2.data;

  return { props: { popoRcStdntCnt, totalRcStdntCnt } }
}
