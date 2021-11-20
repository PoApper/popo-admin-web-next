import { Button, Form, Icon, Image, Modal } from 'semantic-ui-react'
import { useState } from 'react'
import axios from 'axios'
import DeleteConfirmModal from '../common/delete.confirm.modal'

const AssociationUpdateModal = (props) => {
  const association = props.association;

  const [open, setOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [name, setName] = useState(association.name)
  const [content, setContent] = useState(association.content)
  const [location, setLocation] = useState(association.location)
  const [representative, setRepresentative] = useState(association.representative)
  const [contact, setContact] = useState(association.contact)
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
      await axios.put(
        `${process.env.NEXT_PUBLIC_API}/introduce/association/${association.uuid}`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      )
      setOpen(false)
      window.location.reload()
    } catch (e) {
      alert('자치단체 정보 수정에 실패했습니다.')
      console.log(e)
    }
  }

  return (
    <Modal
      closeIcon
      open={open} trigger={props.trigger}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>자치단체 정보 수정</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group>
            <Form.Input
              required
              label={'자치단체 이름'}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.TextArea
            required
            label={'소개글'}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <Form.Input
            required
            label={'위치'}
            placeholder={"예: 학생회관 OOO호"}
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <Form.Input
            label={'대표자'}
            placeholder={"홍길동"}
            value={representative}
            onChange={e => setRepresentative(e.target.value)}
          />
          <Form.Input
            label={'연락처'}
            placeholder={"OOOOO@postech.ac.kr"}
            value={contact}
            onChange={e => setContact(e.target.value)}
          />
          <Form.Input
            label={'자치단체 로고'}
            type={'file'}
            onChange={e => setLogo(e.target.files[0])}
          />
          <p>이미지가 없으면 기본 이미지가 표시됩니다.</p>
          <div style={{ margin: '10px 0' }}>
            <Image
              src={`${process.env.NEXT_PUBLIC_API}/introduce/association/image/${association.logoName}`
              ?? 'https://react.semantic-ui.com/images/wireframe/image.png'}
              alt={"association_image"}
              size={'medium'}
            />
          </div>
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
                deleteURI={`introduce/association/${association.uuid}`}
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

export default AssociationUpdateModal