import { useEffect, useState } from 'react';

import { PoPoAxios } from '@/utils/axios.instance';
import ReservationLayout from '@/components/reservation/reservation.layout'
import EquipmentReservationTable
  from '@/components/equipment/equipment.reservation.table'
import PlaceReservationWaitTable
  from '@/components/place/place.reservation.wait.table'

const ReservationPage = ({
  totalReservationCnt,
  todayReservationCnt,
  thisWeekReservationCnt,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [placeReservations, setPlaceReservations] = useState([]);
  const [equipReservations, setEquipReservations] = useState([]);

  useEffect(() => {
    async function getCurrentPlaceReservations() {
      const res = await PoPoAxios.get('reservation-place?status=심사중');
      setPlaceReservations(res.data);
    }
    async function getCurrentEquipReservations() {
      const res = await PoPoAxios.get('reservation-equip?status=심사중');
      setEquipReservations(res.data);
    }

    Promise.all([
      getCurrentPlaceReservations(),
      getCurrentEquipReservations(),
    ]).then(() => setIsLoading(false));
  }, [])


  return (
    <ReservationLayout>
      <h3>예약 대기 목록</h3>
      <p>
        총 예약 수: {Number(totalReservationCnt).toLocaleString()}건<br/>
        오늘 예약 수: {Number(todayReservationCnt).toLocaleString()}건<br/>
        이번 주 예약 수: {Number(thisWeekReservationCnt).toLocaleString()}건<br/>
      </p>
      <p>
        <b>심사중</b>인 모든 예약이 이곳에 표시됩니다. 예약 제목을 누르면 상세 예약 정보를 확인할 수 있습니다.
      </p>
      <p>
        예약 종료 시간이 현재 시간을 지났다면 <span style={{color: 'red'}}>빨간색</span>으로 표시됩니다.
      </p>

      <div style={{marginBottom: 24}}>
        <h4>장소 예약 ({placeReservations.length}건 대기중)</h4>
        {
          isLoading ? <p>로딩 중...</p> : (
            placeReservations.length ?
              <PlaceReservationWaitTable
                reservations={placeReservations}
                startIdx={0}
              /> : <p>대기 중인 장소 예약이 없습니다 🎈</p>
          )
        }
      </div>

      <div style={{marginBottom: 24}}>
        <h4>장비 예약 ({equipReservations.length}건 대기중)</h4>
        {
          isLoading ? <p>로딩 중...</p> : (
            equipReservations.length ?
              <EquipmentReservationTable
                reservations={equipReservations}
                startIdx={0}
              /> : <p>대기 중인 장비 예약이 없습니다 🎈</p>
          )
        }
      </div>

    </ReservationLayout>
  )
}

export default ReservationPage

export async function getServerSideProps() {
  const res1 = await PoPoAxios.get('statistics/reservation/count');
  const placeReservationCntStats = res1.data;

  const {
    totalReservationCnt,
    todayReservationCnt,
    thisWeekReservationCnt,
  } = placeReservationCntStats;

  return { props: {
    totalReservationCnt,
    todayReservationCnt,
    thisWeekReservationCnt,
  } };
}
