import Link from 'next/link'
import moment from 'moment'
import { Table } from 'semantic-ui-react'

const NoticeTable
 = ({notices}) => {

  return (
    <Table
      celled selectable
      textAlign={'center'}
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>id.</Table.HeaderCell>
          <Table.HeaderCell>제목</Table.HeaderCell>
          <Table.HeaderCell>이미지</Table.HeaderCell>
          <Table.HeaderCell>메모</Table.HeaderCell>
          <Table.HeaderCell>게시 일자</Table.HeaderCell>
          <Table.HeaderCell>클릭수</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          notices.map((notice, idx) =>
          <Link href={`benefit/notice/update/${affiliate.id}`} key={affiliate.id}>
          <Table.Row key={notice.id}>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>
                  <a href={notice.link} target={'_blank'} rel={"noreferrer"}>
                    {notice.title}
                  </a>
                </Table.Cell>
                <Table.Cell>{notice.content}</Table.Cell>
                <Table.Cell>
                  {moment(notice.created_at).
                    format('YYYY-MM-DD HH:mm')}
                </Table.Cell>
                <Table.Cell>
                  {notice.click_count}
                </Table.Cell>
              </Table.Row>
            </Link>
          )
        }
      </Table.Body>
    </Table>
  )
}

export default NoticeTable
