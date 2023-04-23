import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
import axios from 'axios'
import EquipmentUpdateModal from './equipment.update.modal'

const ownerNames = {
  'chonghak': '총학생회',
  'dongyeon': '동아리연합회',
  'dormUnion': '생활관자치회',
  'saengna': '생각나눔',
  'others': '그 외',
}
const EquipmentTable = () => {
  const [equipments, setEquipments] = useState([])

  // TODO: move out to caller component
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/equip`)
      .then((res) => setEquipments(res.data))
      .catch((err) => {
        alert('장비 목록을 불러오는데 실패했습니다.')
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
          <Table.HeaderCell>장비명</Table.HeaderCell>
          <Table.HeaderCell>장비 소속</Table.HeaderCell>
          <Table.HeaderCell>대여비</Table.HeaderCell>
          <Table.HeaderCell>총 예약 갯수</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          equipments.map((equipment, idx) =>
            <EquipmentUpdateModal
              key={equipment.uuid}
              equipmentInfo={equipment}
              trigger={<Table.Row key={equipment.uuid}>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{equipment.name}</Table.Cell>
                <Table.Cell>{ownerNames[equipment.equip_owner]}</Table.Cell>
                <Table.Cell>{equipment.fee.toLocaleString()}</Table.Cell>
                <Table.Cell>{equipment.max_reservation_count.toLocaleString()}</Table.Cell>
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

export default EquipmentTable