import BoardLayout from '@/components/board/board.layout'
import { PoPoAxios } from '@/utils/axios.instance';
import CsvUploadForm from '@/components/common/csv-upload.form';

const RcStudentsListPage = ({ rcStdntCnt }) => {
  return (
    <BoardLayout>
      <h3>RC 사생 명단 업로드</h3>
      <div>
        RC 사생에게만 RC 장소 예약을 받기 위해 RC 사생 명단 정보가 필요합니다.
        아래 주소에서 CSV 파일을 다운 받아 요 형식에 맞춰 입력 후, 다시 CSV 파일을 업로드 해주세요.
        CSV 파일이 업로드 되면, RC 사생 명단 초기화 후 업로드 된 명단에 있는 Povis ID를 가진 모든 유저를 RC 사생으로 분류합니다.
        만약 RC 사생 명단 업로드 후에 RC 사생이 추가로 가입한다면, 자동으로 RC 사생으로 분류됩니다.
      </div>

      <div>
        현재 RC 사생 수: {rcStdntCnt}명
      </div>

      <CsvUploadForm
        label={'RC 사생 명단'}
        uploadUri={'/setting/rc-students-list'}
      />
    </BoardLayout>
  )
}

export default RcStudentsListPage;

export async function getServerSideProps() {
  const res = await PoPoAxios.get('/user/count/RC_STUDENT');
  const rcStdntCnt = res.data;

  return { props: { rcStdntCnt } }
}
