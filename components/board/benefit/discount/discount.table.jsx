import React from 'react'
import Link from "next/link";
import moment from 'moment'
import { Table } from 'semantic-ui-react'

const DiscountTable = ({ discountList }) => {

  return (
    <Table
      celled selectable
      textAlign={'center'}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>idx.</Table.HeaderCell>
          <Table.HeaderCell>업체명</Table.HeaderCell>
          <Table.HeaderCell>지역</Table.HeaderCell>
          <Table.HeaderCell>영업 시간 </Table.HeaderCell>
          <Table.HeaderCell>가게 번호</Table.HeaderCell>
          <Table.HeaderCell>할인 내용</Table.HeaderCell>
          <Table.HeaderCell>생성일</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          discountList.map((discount, idx) => (
            <Link href={`benefit/discount/update/${discount.uuid}`} key={discount.uuid}>
              <Table.Row>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{discount.title}</Table.Cell>
                <Table.Cell>{discount.region}</Table.Cell>
                <Table.Cell>{discount.open_hour}</Table.Cell>
                <Table.Cell>{discount.phone}</Table.Cell>
                <Table.Cell>{discount.content}</Table.Cell>
                <Table.Cell>
                  {
                    moment(discount.created_at).format('YYYY-MM-DD HH:mm')
                  }
                </Table.Cell>
              </Table.Row>
            </Link>
          ))
        }
      </Table.Body>
    </Table>
  )
}

export default DiscountTable;
