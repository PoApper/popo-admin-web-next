import { useEffect, useState } from 'react'
import axios from 'axios'
import ReservationLayout from '../../components/reservation/reservation.layout'
import EquipmentReservationTable
  from '../../components/equipment/equipment.reservation.table'
import PlaceReservationWaitTable
  from '../../components/place/place.reservation.wait.table'

const ReservationPage = () => {
  const [place_reservations, setPlaceReservations] = useState([])
  const [equip_reservations, setEquipReservations] = useState([])

  useEffect(() => {
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/reservation-place?status=심사중`,
    ).then((res) => {
      setPlaceReservations(res.data)
    })
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/reservation-equip?status=심사중`,
    ).then((res) => {
      setEquipReservations(res.data)
    })
  }, [])

  return (
    <ReservationLayout>
      <h3>예약 대기 목록</h3>
      <p>
        <b>심사중</b>인 모든 예약이 이곳에 표시됩니다. 예약 제목을 누르면 상세 예약 정보를 확인할 수 있습니다.
      </p>
      <p>
        예약 종료 시간이 현재 시간을 지났다면 <span style={{color: 'red'}}>빨간색</span>으로 표시됩니다.
      </p>

      <div style={{marginBottom: 24}}>
        <h4>장소 예약</h4>
        {
          place_reservations.length ?
            <PlaceReservationWaitTable
              reservations={place_reservations}
              startIdx={0}
            /> : <p>대기 중인 장소 예약이 없습니다 🎈</p>
        }
      </div>

      <div style={{marginBottom: 24}}>
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