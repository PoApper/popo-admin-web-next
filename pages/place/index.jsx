import ReservationLayout from '../../components/reservation/reservation.layout'
import PlaceTable from '../../components/place/place.table'
import PlaceCreateModal from '../../components/place/place.create.modal'
import { Button } from 'semantic-ui-react'
import React from 'react'

const PlacePage = () => {
  return (
    <ReservationLayout>
      <h3>장소 목록</h3>
      <p>
        장소는 마지막 수정일 순서로 정렬되어 표시됩니다!
      </p>
      <PlaceCreateModal
        trigger={<Button>장소 생성</Button>}
      />
      <PlaceTable/>
    </ReservationLayout>
  )
}

export default PlacePage