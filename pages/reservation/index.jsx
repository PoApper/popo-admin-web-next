import { useEffect, useState } from 'react'
import axios from 'axios'
import ReservationLayout from '../../components/reservation/reservation.layout'
import PlaceReservationTable
  from '../../components/place/place.reservation.table'
import EquipmentReservationTable
  from '../../components/equipment/equipment.reservation.table'

const ReservationPage = () => {
  const [place_reservations, setPlaceReservations] = useState([])
  const [equip_reservations, setEquipReservations] = useState([])

  useEffect(async () => {
    const res1 = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/reservation-place?status=심사중`,
    )
    setPlaceReservations(res1.data)
    const res2 = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/reservation-equip?status=심사중`,
    )
    setEquipReservations(res2.data)
  }, [])

  return (
    <ReservationLayout>
      <h3>예약 대기 목록</h3>
      <p><b>심사중</b>인 모든 예약이 이곳에 표시됩니다.</p>
      <div style={{marginBottom: "1rem"}}>
        <h4>장소 예약</h4>
        {
          place_reservations.length ?
            <PlaceReservationTable
              reservations={place_reservations}
              startIdx={0}
            /> : <p>대기 중인 장소 예약이 없습니다 🎈</p>
        }
      </div>
      <div style={{marginBottom: "1rem"}}>
        <h4>장비 예약</h4>
        {
          equip_reservations.length ?
            <EquipmentReservationTable
              reservations={equip_reservations}
              startIdx={0}
            /> : <p>대기 중인 장비 예약이 없습니다 🎈</p>
        }
      </div>

    </ReservationLayout>
  )
}

export default ReservationPage