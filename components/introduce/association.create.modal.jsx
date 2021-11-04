import { Form, Modal } from 'semantic-ui-react'
import { useState } from 'react'
import axios from 'axios'

const AssociationCreateModal = (props) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [location, setLocation] = useState('')
  const [representative, setRepresentative] = useState('')
  const [contact, setContact] = useState('')
  const [logo, setLogo] = useState()

  const handleSubmit = async () => {
    try {
      let formData = new FormData()
      formData.append('name', name)
      formData.append('content', content)
      formData.append('location', location)
      formData.append('representative', representative)
      formData.append('contact', contact)
      if (logo) {
        formData.append('logo', logo)
      }
      await axios.post(
        `${process.env.NEXT_PUBLIC_API}/introduce/association`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      )
      setOpen(false)
      window.location.reload()
    } catch (e) {
      alert('자치단체 생성에 실패했습니다.')
      console.log(e)
    }
  }

  return (
    <Modal
      open={open} trigger={props.trigger}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>자치단체 생성</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            required
            label={'자치단체 이름'}
            onChange={e => setName(e.target.value)}
          />
          <Form.TextArea
            required
            label={'소개글'}
            onChange={e => setContent(e.target.value)}
          />
          <Form.Input
            required
            label={'위치'}
            placeholder={'예: 학생회관 OOO호'}
            onChange={e => setLocation(e.target.value)}
          />
          <Form.Input
            label={'대표자'}
            placeholder={'홍길동'}
            onChange={e => setRepresentative(e.target.value)}
          />
          <Form.Input
            label={'연락처'}
            placeholder={'OOOOO@postech.ac.kr'}
            onChange={e => setContact(e.target.value)}
          />
          <Form.Input
            label={'자치단체 로고'}
            type={'file'}
            onChange={e => setLogo(e.target.files[0])}
          />
          <p>이미지가 없으면 기본 이미지가 등록됩니다.</p>
          <Modal.Actions>
            <Form.Group>
              <Form.Button
                type={'submit'}
                onClick={handleSubmit}>
                생성
              </Form.Button>
            </Form.Group>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default AssociationCreateModal