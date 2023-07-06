import React from 'react'
import { Table } from 'semantic-ui-react'
import EquipmentUpdateModal from './equipment.update.modal'

const ownerNames = {
  'chonghak': '총학생회',
  'dongyeon': '동아리연합회',
  'dormUnion': '생활관자치회',
  'saengna': '생각나눔',
  'others': '그 외',
}
const EquipmentTable = ({ equipmentList }) => {
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
          <Table.HeaderCell>일일 한도 (분)</Table.HeaderCell>
          <Table.HeaderCell>총 예약 갯수</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          equipmentList.map((equipment, idx) =>
            <EquipmentUpdateModal
              key={equipment.uuid}
              equipmentInfo={equipment}
              trigger={<Table.Row key={equipment.uuid}>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{equipment.name}</Table.Cell>
                <Table.Cell>{ownerNames[equipment.equip_owner]}</Table.Cell>
                <Table.Cell>{equipment.fee.toLocaleString()}</Table.Cell>
                <Table.Cell>
                  {
                    equipment.max_minutes === 1440 ?
                      '제한 없음' :
                      equipment.max_minutes.toLocaleString()
                  }
                </Table.Cell>
                <Table.Cell>{equipment.total_reservation_count.toLocaleString()}</Table.Cell>
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