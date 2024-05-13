import Link from 'next/link';
import moment from 'moment';
import { Table } from 'semantic-ui-react';

const CalendarTable = ({ calendars }) => {
  return (
    <Table celled selectable textAlign={'center'}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={6}>제목</Table.HeaderCell>
          <Table.HeaderCell width={4}>날짜</Table.HeaderCell>
          <Table.HeaderCell width={2}>D-Day</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {calendars.map((calendar) => {
          const isDisabled = moment().isAfter(moment(calendar.event_date));
          const dDay = moment(calendar.event_date).diff(moment(), 'days');

          return (
            <Link
              href={`/board/calendar/update/${calendar.id}`}
              key={calendar.id}
            >
              <Table.Row key={calendar.id} disabled={isDisabled}>
                <Table.Cell>
                  {calendar.link ? (
                    <a
                      href={calendar.link}
                      target={'_blank'}
                      rel={'noreferrer'}
                    >
                      {calendar.title}
                    </a>
                  ) : (
                    calendar.title
                  )}
                </Table.Cell>
                <Table.Cell>{calendar.event_date}</Table.Cell>
                <Table.Cell>{dDay ? `D-${dDay}` : 'D-Day'}</Table.Cell>
              </Table.Row>
            </Link>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default CalendarTable;
