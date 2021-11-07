import ReservationLayout from '../../components/reservation/reservation.layout'
import { Button } from 'semantic-ui-react'
import EquipmentTable from '../../components/equipment/equipment.table'
import EquipmentCreateModal
  from '../../components/equipment/equipment.create.modal'

const EquipmentPage = () => {
  return (
    <ReservationLayout>
      <h3>장비 목록</h3>
      <p>
        장비는 마지막 수정일 순서로 정렬되어 표시됩니다!
      </p>
      <EquipmentCreateModal
        trigger={<Button>장비 생성</Button>}
      />
      <EquipmentTable/>
    </ReservationLayout>
  )
}

export default EquipmentPage