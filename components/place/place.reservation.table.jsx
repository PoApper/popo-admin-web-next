import React, { useEffect, useState } from 'react'
import { Pagination, Table } from 'semantic-ui-react'
import moment from 'moment'
import axios from 'axios'

const PlaceReservationTable = () => {
  const [reservations, setReservations] = useState([])
  const [page, setPage] = useState(1)
  const [total_count, setTotalCount] = useState(0)
  const page_size = 10

  useEffect(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/reservation-place?take=${page_size}`, {
          withCredentials: true,
        })
      setReservations(res.data)
      const res2 = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/reservation-place/count`,
      )
      setTotalCount(res2.data)
    } catch (err) {
      alert('장소 예약 목록을 불러오는데 실패했습니다.')
      console.log(err)
    }
  }, [])

  const handlePageChange = async (e, target) => {
    const activePage = target.activePage
    const ret = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/reservation-place?take=10&skip=${page_size *
      (activePage - 1)}`, { withCredentials: true })
    setReservations(ret.data)
    setPage(activePage)
  }

  return (
    <>
      <Table
        celled selectable
        textAlign={'center'} color={'orange'}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>idx.</Table.HeaderCell>
            <Table.HeaderCell width={3}>장소명</Table.HeaderCell>
            <Table.HeaderCell width={2}>사용자</Table.HeaderCell>
            <Table.HeaderCell>예약 제목</Table.HeaderCell>
            <Table.HeaderCell width={4}>예약 기간</Table.HeaderCell>
            <Table.HeaderCell width={2}>상태</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            reservations.map((reservation, idx) =>
              <Table.Row key={(page - 1) * page_size + idx}>
                <Table.Cell>{(page - 1) * page_size + idx + 1}</Table.Cell>
                <Table.Cell>{reservation.place.name}</Table.Cell>
                <Table.Cell>{reservation.booker.name}</Table.Cell>
                <Table.Cell>{reservation.title}</Table.Cell>
                <Table.Cell>
                  <b>
                    {moment(reservation.date, 'YYYYMMDD').
                      format('YYYY년 MM월 DD일')}
                    <br/>
                    {moment(reservation.start_time, 'HHmm').
                      format('HH:mm')}
                    &nbsp;~&nbsp;
                    {moment(reservation.end_time, 'HHmm').
                      format('HH:mm')}
                  </b>
                </Table.Cell>
                <Table.Cell>{reservation.status}</Table.Cell>
              </Table.Row>)
          }
        </Table.Body>
      </Table>
      <div style={{ display: 'flex' }}>
        <Pagination
          style={{ margin: '0 auto' }}
          activePage={page}
          totalPages={Math.ceil(total_count / page_size)}
          prevItem={null} nextItem={null}
          onPageChange={handlePageChange}
        />
      </div>

    </>
  )
}

export default PlaceReservationTable