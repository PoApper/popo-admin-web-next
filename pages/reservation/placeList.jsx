import ReservationLayout from '../../components/reservation/reservation.layout'
import PlaceTable from '../../components/place/place.table'
import PlaceCreateModal from '../../components/place/place.create.modal'
import { Button } from 'semantic-ui-react'

const PlaceListPage = () => {
  return (
    <ReservationLayout>
      <PlaceCreateModal
        trigger={<Button>장소 생성</Button>}
      />
      <PlaceTable/>
    </ReservationLayout>
  )
}

export default PlaceListPage