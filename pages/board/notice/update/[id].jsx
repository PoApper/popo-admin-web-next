import { useState } from 'react'
import { useRouter } from "next/router";
import { Form, Message } from "semantic-ui-react";

import { PoPoAxios } from "@/utils/axios.instance";
import BoardLayout from '@/components/board/board.layout';
import DeleteConfirmModal from "@/components/common/delete.confirm.modal";

const NoticeUpdatePage = ({ noticeInfo }) => {
  const router = useRouter();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  
  const [title, setTitle] = useState(noticeInfo.title)
  const [memo, setMemo] = useState(noticeInfo.memo)
  const [link, setLink] = useState(noticeInfo.link)
  const [start_datetime, setStartDatetime] = useState(noticeInfo.start_datetime)
  const [end_datetime, setEndDatetime] = useState(noticeInfo.end_datetime)

  const handleSubmit = async () => {
    const body = {
      'title': title,
      'memo': memo,
      'link': link,
      'start_datetime': start_datetime,
      'end_datetime': end_datetime,
    }
    
    if (start_datetime > end_datetime) {
      alert('시작 일자가 종료 일자보다 늦을 수 없습니다.')
      return;
    }

    PoPoAxios.put('/notice',
      body,
      { withCredentials: true },
    ).then(() => {
      alert('공지사항이 업데이트 되었습니다!')
      router.push('/board/notice');
    }).catch(err => {
      const errMsg = err.response.data.message;
      alert(`공지사항 업데이트에 실패했습니다.\n${errMsg}`);
    })
  }

  return (
    <BoardLayout>
      <h3>공지사항 수정</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Input
          required
          label={'제목'}
          onChange={e => setTitle(e.target.value)}
        />
        
        <Message>
          공지사항은 이미지가 업로드 되어야 게시됩니다.
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


        <Form.Group>
          <Form.Button type={'submit'}>
            수정
          </Form.Button>
          <DeleteConfirmModal
            open={deleteModalOpen}
            target={title}
            deleteURI={`notice/${id}`}
            afterDeleteURI={'/board/notice'}
            trigger={(
              <Button negative
                      onClick={() => setDeleteModalOpen(true)}>
                <Icon name={'trash'}/> 삭제
              </Button>)}
          />
          
        </Form.Group>
      </Form>
    </BoardLayout>
  )
}

export default NoticeUpdatePage;

export async function getServerSideProps(ctx) {
  const { id } = ctx['params'];
  const res = await PoPoAxios.get(`notice/${id}`);
  const noticeInfo = res.data;

  return { props: { noticeInfo } }
}
