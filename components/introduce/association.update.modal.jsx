import { Button, Form, Icon, Image, Modal } from 'semantic-ui-react'
import { useState } from 'react'
import DeleteConfirmModal from '../common/delete.confirm.modal'
import { popoApiUrl, PoPoAxios } from "../../utils/axios.instance";

const AssociationUpdateModal = ({ association, trigger }) => {
  const [open, setOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const [name, setName] = useState(association.name)
  const [content, setContent] = useState(association.content)
  const [location, setLocation] = useState(association.location)
  const [representative, setRepresentative] = useState(association.representative)
  const [contact, setContact] = useState(association.contact)
  const [logo, setLogo] = useState()
  const [homepageUrl, setHomepageUrl] = useState(association.homepage_url)
  const [facebookUrl, setFacebookUrl] = useState(association.facebook_url)
  const [instagramUrl, setInstagramUrl] = useState(association.instagram_url)

  const handleSubmit = async () => {
    try {
      let formData = new FormData()
      formData.append('name', name)
      formData.append('content', content)
      formData.append('location', location)
      formData.append('representative', representative)
      formData.append('contact', contact)
      formData.append('homepage_url', homepageUrl)
      formData.append('facebook_url', facebookUrl)
      formData.append('instagram_url', instagramUrl)
      if (logo) {
        formData.append('logo', logo)
      }
      await PoPoAxios.put(`/introduce/association/${association.uuid}`,
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
      open={open} trigger={trigger}
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
            required
            label={'대표자'}
            placeholder={"홍길동"}
            value={representative}
            onChange={e => setRepresentative(e.target.value)}
          />
          <Form.Input
            required
            label={'연락처'}
            placeholder={"OOOOO@postech.ac.kr"}
            value={contact}
            onChange={e => setContact(e.target.value)}
          />
          <Form.Input
            label={'홈페이지 링크'}
            placeholder={"https://OOOOOOO"}
            value={homepageUrl}
            onChange={e => setHomepageUrl(e.target.value)}
          />
          <Form.Input
            label={'페이스북'}
            placeholder={"https://www.facebook.com/profile.php?id=OOOOOOOO"}
            value={facebookUrl}
            onChange={e => setFacebookUrl(e.target.value)}
          />
          <Form.Input
            label={'인스타그램'}
            placeholder={"https://www.instagram.com/OOOOOO"}
            value={instagramUrl}
            onChange={e => setInstagramUrl(e.target.value)}
          />
          <Form.Input
            label={'자치단체 로고'}
            type={'file'}
            onChange={e => setLogo(e.target.files[0])}
          />
          <p>이미지가 없으면 기본 이미지가 표시됩니다.</p>
          <div style={{ margin: '10px 0' }}>
            <Image
              src={`${popoApiUrl}/introduce/association/image/${association.logoName}`
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