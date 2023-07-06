import { Button } from 'semantic-ui-react'

import ReservationLayout from '@/components/reservation/reservation.layout'
import EquipmentTable from '@/components/equipment/equipment.table'
import EquipmentCreateModal
  from '@/components/equipment/equipment.create.modal'
import { PoPoAxios } from "@/utils/axios.instance";

const EquipmentPage = ({ equipmentList }) => {
  return (
    <ReservationLayout>
      <h3>장비 목록</h3>
      <div style={{marginBottom: "1rem"}}>
        <EquipmentCreateModal
          trigger={<Button>장비 생성</Button>}
        />
      </div>
      <p>
        장비는 마지막 수정일 순서로 정렬되어 표시됩니다!
      </p>
      <div>
        <EquipmentTable equipmentList={equipmentList}/>
      </div>
    </ReservationLayout>
  )
}

export default EquipmentPage;

export async function getServerSideProps() {
  const res = await PoPoAxios.get('equip');
  const equipmentList = res.data;

  return { props: { equipmentList } };
}
