import { useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Button, Form, Icon, Message } from 'semantic-ui-react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { PoPoAxios } from '@/utils/axios.instance';
import BoardLayout from '@/components/board/board.layout';
import DeleteConfirmModal from '@/components/common/delete.confirm.modal';

const CalendarUpdatePage = ({ calendarInfo }) => {
  const router = useRouter();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const id = calendarInfo.id;
  const [title, setTitle] = useState(calendarInfo.title);
  const [start_date, setStartDate] = useState(calendarInfo.start_date);
  const [end_date, setEndDate] = useState(calendarInfo.end_date);

  const duration = moment(end_date).diff(moment(start_date), 'days');

  const handleSubmit = async () => {
    const body = {
      title: title,
      start_date: start_date,
      end_date: end_date,
    };

    if (start_date > end_date) {
      alert('시작 일자가 종료 일자보다 늦을 수 없습니다.');
      return;
    }

    PoPoAxios.put(`/calendar/${id}`, body, { withCredentials: true })
      .then(() => {
        alert('학사일정이 업데이트 되었습니다!');
        router.push('/board/calendar');
      })
      .catch((err) => {
        const errMsg = err.response.data.message;
        alert(`학사일정 업데이트에 실패했습니다.\n${errMsg}`);
      });
  };

  return (
    <BoardLayout>
      <h3>학사일정 수정</h3>

      <Form>
        <Form.Input
          required
          label={'제목'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div style={{ display: 'flex', gap: 12 }}>
          <div className={'required field'}>
            <label>시작 날짜</label>
            <ReactDatePicker
              selected={start_date ? moment(start_date).toDate() : null}
              onChange={(date) =>
                setStartDate(moment(date).format('YYYY-MM-DD'))
              }
              onKeyDown={(e) => e.preventDefault()}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className={'required field'}>
            <label>종료 날짜</label>
            <ReactDatePicker
              selected={end_date ? moment(end_date).toDate() : null}
              onChange={(date) => setEndDate(moment(date).format('YYYY-MM-DD'))}
              onKeyDown={(e) => e.preventDefault()}
              dateFormat="yyyy-MM-dd"
              minDate={moment(start_date).toDate()}
            />
          </div>
        </div>
        <Message>
          {!start_date || !end_date
            ? '게시 시작 날짜와 종료 날짜를 입력해주세요.'
            : start_date > end_date
              ? '시작 날짜가 종료 날짜보다 늦을 수 없습니다.'
              : `게시 기간: ${start_date} ~ ${end_date} (${duration}일)`}
        </Message>

        <Form.Group>
          <Form.Button type={'submit'} onClick={handleSubmit}>
            수정
          </Form.Button>
          <DeleteConfirmModal
            open={deleteModalOpen}
            target={title}
            deleteURI={`calendar/${id}`}
            afterDeleteURI={'/board/calendar'}
            trigger={
              <Button negative onClick={() => setDeleteModalOpen(true)}>
                <Icon name={'trash'} /> 삭제
              </Button>
            }
          />
        </Form.Group>
      </Form>
    </BoardLayout>
  );
};

export default CalendarUpdatePage;

export async function getServerSideProps(ctx) {
  const { id } = ctx['params'];
  const res = await PoPoAxios.get(`calendar/${id}`);
  const calendarInfo = res.data;

  return { props: { calendarInfo } };
}
