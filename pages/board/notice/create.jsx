import { useState } from 'react'
import { useRouter } from "next/router";
import { Form, Message } from "semantic-ui-react";

import { PoPoAxios } from "@/utils/axios.instance";
import BoardLayout from '@/components/board/board.layout';
import ReactDatePicker from 'react-datepicker';

const NoticeCreatePage = () => {
  const router = useRouter();

  const [title, setTitle] = useState('')
  const [memo, setMemo] = useState()
  const [link, setLink] = useState()
  const [start_datetime, setStartDatetime] = useState()
  const [end_datetime, setEndDatetime] = useState()

  const handleSubmit = async () => {
    const body = {
      'title': title,
      'memo': memo,
      'link': link,
      'start_datetime': start_datetime,
      'end_datetime': end_datetime,
    }
    
    if (!start_datetime || !end_datetime) {
      alert('시작 일자와 종료 일자를 입력해주세요.')
      return;
    }
    
    if (start_datetime > end_datetime) {
      alert('시작 일자가 종료 일자보다 늦을 수 없습니다.')
      return;
    }

    PoPoAxios.post('/notice',
      body,
      { withCredentials: true },
    ).then(() => {
      alert('공지사항이 등록 되었습니다!')
      router.push('/board/notice');
    }).catch(err => {
      const errMsg = err.response.data.message;
      alert(`공지사항 등록에 실패했습니다.\n${errMsg}`);
    })
  }

  return (
    <BoardLayout>
      <h3>공지사항 생성</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Input
          required
          label={'제목'}
          onChange={e => setTitle(e.target.value)}
        />
        
        <Message>
          공지사항은 이미지가 업로드 되어야 게시됩니다. 이미지 업로드는 공지사항 생성 후, 등록 할 수 있습니다.
        </Message>

        <Form.TextArea
          required
          label={'메모'}
          onChange={e => setMemo(e.target.value)}
        />
        
        <Form.Input
          required
          label={'공지사항 링크'}
          onChange={e => setLink(e.target.value)}
        />
        <p>
          링크가 존재하는 공지사항일 경우 링크를 입력해주세요.
        </p>
        
        <div className={'required field'}>
          <label>시작 날짜</label>
          <ReactDatePicker>
            
          </ReactDatePicker>
        </div>

        <Form.Button type={'submit'}>
          생성
        </Form.Button>
      </Form>
    </BoardLayout>
  )
}

export default NoticeCreatePage;
