import React from 'react'
import Link from "next/link";
import moment from 'moment'
import { Table } from 'semantic-ui-react'

const AffiliateTable = ({ affiliateList }) => {

  return (
    <Table
      celled selectable
      textAlign={'center'}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>idx.</Table.HeaderCell>
          <Table.HeaderCell>업체명</Table.HeaderCell>
          <Table.HeaderCell>짤은 설명</Table.HeaderCell>
          <Table.HeaderCell>설명</Table.HeaderCell>
          <Table.HeaderCell>생성일</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          affiliateList.map((affiliate, idx) => (
            <Link href={`benefit/affiliate/update/${affiliate.uuid}`} key={affiliate.uuid}>
              <Table.Row>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{affiliate.title}</Table.Cell>
                <Table.Cell>{affiliate.content_short}</Table.Cell>
                <Table.Cell>{affiliate.content}</Table.Cell>
                <Table.Cell>
                  {
                    moment(affiliate.created_at).format('YYYY-MM-DD HH:mm')
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

export default AffiliateTable;
