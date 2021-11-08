import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ReservationLayout from '../../components/reservation/reservation.layout'
import { Pagination } from 'semantic-ui-react'
import EquipmentReservationTable
  from '../../components/equipment/equipment.reservation.table'

const EquipmentReservationPage = () => {
  const [reservations, setReservations] = useState([])
  const [page, setPage] = useState(1)
  const [total_count, setTotalCount] = useState(0)
  const page_size = 10

  useEffect(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/reservation-equip?take=${page_size}`, {
          withCredentials: true,
        })
      setReservations(res.data)
      const res2 = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/reservation-equip/count`,
      )
      setTotalCount(res2.data)
    } catch (err) {
      alert('장비 예약 목록을 불러오는데 실패했습니다.')
      console.log(err)
    }
  }, [])

  const handlePageChange = async (e, target) => {
    const activePage = target.activePage
    const ret = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/reservation-equip?take=${page_size}&skip=${page_size *
      (activePage - 1)}`, { withCredentials: true })
    setReservations(ret.data)
    setPage(activePage)
  }

  return (
    <ReservationLayout>
      <h3>장비 예약 목록</h3>
      <p>
        예약은 생성일 순서로 정렬되어 표시됩니다!<br/>
        예약 내용을 수정하는 건 <b>불가능</b>합니다. 예약 승인/거절/삭제만 가능합니다.
      </p>
      <div>
        <EquipmentReservationTable
          reservations={reservations}
          startIdx={(page - 1) * page_size}
        />
        <div style={{ display: 'flex' }}>
          <Pagination
            style={{ margin: '0 auto' }}
            activePage={page}
            totalPages={Math.ceil(total_count / page_size)}
            prevItem={null} nextItem={null}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </ReservationLayout>
  )
}

export default EquipmentReservationPage