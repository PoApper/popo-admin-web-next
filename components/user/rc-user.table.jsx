import { Table } from 'semantic-ui-react'

const RcUserTable = ({ users }) => {
  return (
    <Table
      celled selectable
      textAlign={'center'}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>idx.</Table.HeaderCell>
          <Table.HeaderCell>이름</Table.HeaderCell>
          <Table.HeaderCell>이메일</Table.HeaderCell>
          <Table.HeaderCell>POPO 가입여부</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          users.map((user, idx) => { return (
            <Table.Row key={user.uuid}>
              <Table.Cell>{idx + 1}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          )})
        }
      </Table.Body>
    </Table>
  )
}

export default RcUserTable