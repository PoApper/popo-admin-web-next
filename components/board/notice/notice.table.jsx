import Link from 'next/link'
import moment from 'moment'
import { Image, Table } from 'semantic-ui-react'

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
          <Table.HeaderCell>내용</Table.HeaderCell>
          <Table.HeaderCell>이미지</Table.HeaderCell>
          <Table.HeaderCell>게시 일자</Table.HeaderCell>
          <Table.HeaderCell>클릭수</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          notices.map((notice, idx) => {
            const duration = moment(notice.end_datetime).diff(moment(notice.start_datetime), 'hours');
            return (
              <Link href={`/board/notice/update/${notice.id}`} key={notice.id}>
                <Table.Row key={notice.id}>
                  <Table.Cell>{idx + 1}</Table.Cell>
                  <Table.Cell>
                    <a href={notice.link} target={'_blank'} rel={"noreferrer"}>
                      {notice.title}
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    {notice.content}
                  </Table.Cell>
                  <Table.Cell>
                    <Image href={notice.link}/>
                  </Table.Cell>
                  <Table.Cell>
                    {moment(notice.start_datetime).format('YYYY-MM-DD HH:mm')} ~ {moment(notice.end_datetime).format('YYYY-MM-DD HH:mm')} ({Number(duration/24).toFixed(0)}일 {duration%24}시간)
                  </Table.Cell>
                  <Table.Cell>
                    {notice.click_count}
                  </Table.Cell>
                </Table.Row>
              </Link>
            )
          })
        }
      </Table.Body>
    </Table>
  )
}

export default NoticeTable
