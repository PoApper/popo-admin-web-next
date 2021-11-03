import React from 'react'
import { Table } from 'semantic-ui-react'
import moment from 'moment'

const PlaceReservationTable = (props) => {
  const reservations = props.reservations;
  const start_idx = props.startIdx;

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
              <Table.Row key={reservation.uuid}>
                <Table.Cell>{start_idx + idx + 1}</Table.Cell>
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
    </>
  )
}

export default PlaceReservationTable