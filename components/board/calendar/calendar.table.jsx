import Link from 'next/link';
import moment from 'moment';
import { Table } from 'semantic-ui-react';

const CalendarTable = ({ calendars }) => {
  return (
    <Table celled selectable textAlign={'center'}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={4}>제목</Table.HeaderCell>
          <Table.HeaderCell width={6}>기간</Table.HeaderCell>
          <Table.HeaderCell width={1}>D-Day</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {calendars.map((calendar) => {
          const isActive = moment().isBetween(
            moment(calendar.start_date),
            moment(calendar.end_date),
          );
          const duration = moment(calendar.end_date).diff(
            moment(calendar.start_date),
            'days',
          );
          const dDay = moment(calendar.start_date).diff(moment(), 'days');

          return (
            <Link
              href={`/board/calendar/update/${calendar.id}`}
              key={calendar.id}
            >
              <Table.Row key={calendar.id} positive={isActive}>
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
                <Table.Cell>
                  {moment(calendar.start_date).format('YYYY-MM-DD')} ~{' '}
                  {moment(calendar.end_date).format('YYYY-MM-DD')} ({duration}
                  일)
                </Table.Cell>
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
