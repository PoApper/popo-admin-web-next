import { Button, Form, Icon, Image, Modal } from 'semantic-ui-react'
import { useState } from 'react'
import axios from 'axios'
import DeleteConfirmModal from '../common/delete.confirm.modal'

const PlaceUpdateModal = (props) => {
  const placeInfo = props.placeInfo

  const [open, setOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [name, setName] = useState(placeInfo.name)
  const [region, setRegion] = useState(placeInfo.region)
  const [location, setLocation] = useState(placeInfo.location)
  const [description, setDescription] = useState(placeInfo.description)
  const [staff_email, setStaffEmail] = useState(placeInfo.staff_email)
  const [image, setImage] = useState()

  const handleSubmit = async () => {
    try {
      let formData = new FormData()
      formData.append('name', name)
      formData.append('region', region)
      formData.append('location', location)
      formData.append('description', description)
      formData.append('staff_email', staff_email)
      if (image) {
        formData.append('image', image)
      }
      await axios.put(
        `${process.env.NEXT_PUBLIC_API}/place/${placeInfo.uuid}`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      )
      setOpen(false)
      window.location.reload()
    } catch (e) {
      alert('장소 생성에 실패했습니다.')
      console.log(e)
    }
  }

  const regionOptions = [
    { key: 'STUDENT_HALL', text: '학생 회관', value: 'STUDENT_HALL' },
    { key: 'JIGOK_CENTER', text: '지곡 회관', value: 'JIGOK_CENTER' },
    { key: 'OTHERS', text: '생활관 외', value: 'OTHERS' },
  ]

  return (
    <Modal
      open={open} trigger={props.trigger}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>장소 수정</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group>
            <Form.Select
              required
              label={'지역'}
              placeholder={'지역을 선택하세요.'}
              value={region}
              options={regionOptions}
              onChange={e => setRegion(e.target.value)}
            />
            <Form.Input
              required
              label={'장소 이름'}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Input
            required
            label={'위치'}
            placeholder={'예: 학생회관 304호'}
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <Form.TextArea
            required
            label={'설명'}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <Form.Input
            label={'담당자 이메일'}
            placeholder="장소 예약을 처리할 담당자의 이메일을 작성해주세요"
            value={staff_email}
            onChange={e => setStaffEmail(e.target.value)}
          />
          <p>장소 예약이 생성되면, 담당자 메일로 예약 생성 메일이 갑니다.</p>
          <Form.Input
            label={'장소 사진'}
            type={'file'}
            onChange={e => setImage(e.target.files[0])}
          />
          <p>이미지가 없으면 기본 이미지가 등록됩니다.</p>
          <div style={{ margin: '10px 0' }}>
            <Image
              src={`${process.env.NEXT_PUBLIC_API}/place/image/${placeInfo.imageName}`
              ?? 'https://react.semantic-ui.com/images/wireframe/image.png'}
              size={'medium'}
            />
          </div>
          <Modal.Actions>
            <Form.Group>
              <Form.Button
                type={'submit'}
                onClick={handleSubmit}>
                생성
              </Form.Button>
              <DeleteConfirmModal
                open={deleteModalOpen}
                target={name}
                deleteURI={`'place/${placeInfo.uuid}`}
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

export default PlaceUpdateModal