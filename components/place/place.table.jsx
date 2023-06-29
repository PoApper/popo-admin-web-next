import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
import { PoPoAxios } from "@/utils/axios.instance";
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
    PoPoAxios
      .get('/place')
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
          <Table.HeaderCell>일일 한도 (분)</Table.HeaderCell>
          <Table.HeaderCell>총 예약 갯수</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          places.map((place, idx) =>
            <PlaceUpdateModal
              key={place.uuid}
              placeInfo={place}
              trigger={<Table.Row key={place.uuid}>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{place.name}</Table.Cell>
                <Table.Cell>{place.location}</Table.Cell>
                <Table.Cell>{regionNames[place.region]}</Table.Cell>
                <Table.Cell>
                  {
                    place.max_minutes === 1440 ?
                      '제한 없음' :
                      place.max_minutes.toLocaleString()
                  }
                </Table.Cell>
                <Table.Cell>{place.total_reservation_count.toLocaleString()}</Table.Cell>
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