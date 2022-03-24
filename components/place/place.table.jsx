import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
import moment from 'moment'
import axios from 'axios'
import PlaceUpdateModal from './place.update.modal'

const regionNames = {
  'STUDENT_HALL': '학생 회관',
  'JIGOK_CENTER': '지곡 회관',
  'COMMUNITY_CENTER': '커뮤니티 센터',
  'OTHERS': 'OTHERS',
}
const PlaceTable = () => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/place`)
      .then((res) => setPlaces(res.data))
      .catch((err) => {
        alert('장소 목록을 불러오는데 실패했습니다.')
        console.log(err)
      })
  }, [])

  return (
    <Table
      celled selectable
      textAlign={'center'}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>idx.</Table.HeaderCell>
          <Table.HeaderCell>장소명</Table.HeaderCell>
          <Table.HeaderCell>위치</Table.HeaderCell>
          <Table.HeaderCell>지역</Table.HeaderCell>
          <Table.HeaderCell>생성일</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          places.map((place, idx) =>
            <PlaceUpdateModal
              key={place.uuid}
              equipmentInfo={place}
              trigger={<Table.Row key={place.uuid}>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{place.name}</Table.Cell>
                <Table.Cell>{place.location}</Table.Cell>
                <Table.Cell>{regionNames[place.region]}</Table.Cell>
                <Table.Cell>
                  {moment(place.createdAt).format('YYYY년 MM월 DD일 HH:mm')}
                </Table.Cell>
              </Table.Row>}
            />,
          )
        }
      </Table.Body>
      <Table.Footer>
        <Table.Row>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default PlaceTable