import ReservationLayout from '../../components/reservation/reservation.layout'
import { Button } from 'semantic-ui-react'
import EquipmentTable from '../../components/equipment/equipment.table'
import EquipmentCreateModal
  from '../../components/equipment/equipment.create.modal'

const EquipmentPage = () => {
  return (
    <ReservationLayout>
      <EquipmentCreateModal
        trigger={<Button>장소 생성</Button>}
      />
      <EquipmentTable/>
    </ReservationLayout>
  )
}

export default EquipmentPage