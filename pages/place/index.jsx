import ReservationLayout from '../../components/reservation/reservation.layout'
import PlaceTable from '../../components/place/place.table'
import PlaceCreateModal from '../../components/place/place.create.modal'
import { Button } from 'semantic-ui-react'
import React from 'react'

const PlacePage = () => {
  return (
    <ReservationLayout>
      <h3>장소 목록</h3>
      <div style={{ marginBottom: '1rem' }}>
        <PlaceCreateModal
          trigger={<Button>장소 생성</Button>}
        />
      </div>
      <PlaceTable/>
    </ReservationLayout>
  )
}

export default PlacePage