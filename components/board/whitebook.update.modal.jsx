import { Button, Form, Icon, Modal } from 'semantic-ui-react'
import { useState } from 'react'
import axios from 'axios'
import DeleteConfirmModal from '../common/delete.confirm.modal'

const WhitebookUpdateModal = ({ trigger, whitebook }) => {
  const [open, setOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const [title, setTitle] = useState(whitebook.title)
  const [link, setLink] = useState(whitebook.link)
  const [content, setContent] = useState(whitebook.content)

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API}/whitebook`, {
          name: title,
          link: link,
          content: content,
        }, { withCredentials: true },
      )
      setOpen(false)
      window.location.reload()
    } catch (e) {
      alert('생활백서 생성에 실패했습니다.')
      console.log(e)
    }
  }

  return (
    <Modal
      closeIcon
      open={open} trigger={trigger}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>생활백서 수정</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            required
            label={'생활백서 제목'}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Form.Input
            required
            label={'생활백서 링크'}
            value={link}
            placeholder={'https://xxxx.postech.ac.kr'}
            onChange={e => setLink(e.target.value)}
          />
          <Form.TextArea
            required
            label={'생활백서 설명글'}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <Modal.Actions>
            <Form.Group>
              <Form.Button
                type={'submit'}
                onClick={handleSubmit}>
                수정
              </Form.Button>
              <DeleteConfirmModal
                open={deleteModalOpen}
                target={name}
                deleteURI={`whitebook/${whitebook.uuid}`}
                trigger={(
                  <Button negative
                          onClick={() => setDeleteModalOpen(true)}>
                    <Icon name={'trash'}/> 삭제
                  </Button>)}
              />
            </Form.Group>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default WhitebookUpdateModal