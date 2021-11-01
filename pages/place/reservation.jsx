import ReservationLayout from '../../components/reservation/reservation.layout'
import PlaceReservationTable
  from '../../components/place/place.reservation.table'

const PlaceReservationPage = () => {
  return (
    <ReservationLayout>
      <PlaceReservationTable/>
    </ReservationLayout>
  )
}

export default PlaceReservationPage