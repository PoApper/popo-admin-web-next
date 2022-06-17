import React, { useState } from 'react'
import { Checkbox, Table, Button } from 'semantic-ui-react'
import moment from 'moment'
import PlaceReservationConfirmModal
  from './place.reservation.confirm.modal'
import axios from 'axios'

const PlaceReservationWaitTable = ({reservations}) => {
  const [selectedUuidList, setSelectedUuidList] = useState([]);

  function acceptAllInProgressPlaceReservations() {
    axios.patch(`${process.env.NEXT_PUBLIC_API}/reservation-place/all/status/accept`,
      {uuid_list: selectedUuidList}, {withCredentials: true}).then(() => {
      alert('선택한 장소 예약을 승인했습니다.')
      window.location.reload();
    }).catch(err => {
      alert('전체 예약 승인에 실패했습니다.')
      console.log(err)
    })
  }

  function handleCheck(newUuid) {
    const currentList = selectedUuidList;
    const isTargetSelected = currentList.includes(newUuid);

    const newList = isTargetSelected ?
      currentList.filter(uuid => uuid !== newUuid)
      : currentList.concat(newUuid);

    setSelectedUuidList(newList)
  }

  return (
    <>
      <Table
        celled selectable
        textAlign={'center'}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>idx.</Table.HeaderCell>
            <Table.HeaderCell width={3}>장소명</Table.HeaderCell>
            <Table.HeaderCell width={2}>사용자</Table.HeaderCell>
            <Table.HeaderCell>예약 제목</Table.HeaderCell>
            <Table.HeaderCell width={4}>예약 기간</Table.HeaderCell>
            <Table.HeaderCell width={1}/>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            reservations.map((reservation, idx) => {
              const reservation_end_datetime = moment(
                `${reservation.date} ${reservation.end_time}`, 'YYYYMMDD HHmm')
              const isOutdated = moment() > reservation_end_datetime

              return (
                <Table.Row key={reservation.uuid} error={isOutdated}>
                  <Table.Cell>{idx + 1}</Table.Cell>
                  <Table.Cell>{reservation.place.name}</Table.Cell>
                  <Table.Cell>{reservation.booker.name}</Table.Cell>
                  <PlaceReservationConfirmModal
                    key={reservation.uuid}
                    reservation={reservation}
                    trigger={
                        <Table.Cell>{reservation.title}</Table.Cell>
                    }
                  />
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
                  <Table.Cell>
                    <Checkbox onClick={() => handleCheck(reservation.uuid)}/>
                  </Table.Cell>
                </Table.Row>
              )
             }
            )
          }
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan={6}>
              <Button
                positive
                size='small'
                floated='right'
                onClick={acceptAllInProgressPlaceReservations}
              >
                예약 승인
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  )
}

export default PlaceReservationWaitTable