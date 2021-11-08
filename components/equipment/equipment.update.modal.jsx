import { Button, Form, Icon, Image, Modal } from 'semantic-ui-react'
import { useState } from 'react'
import axios from 'axios'
import DeleteConfirmModal from '../common/delete.confirm.modal'

const EquipmentUpdateModal = (props) => {
  const equipmentInfo = props.equipmentInfo

  const [open, setOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [name, setName] = useState(equipmentInfo.name)
  const [equip_owner, setEquipOwner] = useState(equipmentInfo.equip_owner)
  const [fee, setFee] = useState(equipmentInfo.fee)
  const [description, setDescription] = useState(equipmentInfo.description)
  const [staff_email, setStaffEmail] = useState(equipmentInfo.staff_email)
  const [image, setImage] = useState()

  const handleSubmit = async () => {
    try {
      let formData = new FormData()
      formData.append('name', name)
      formData.append('equip_owner', equip_owner)
      formData.append('fee', fee)
      formData.append('description', description)
      formData.append('staff_email', staff_email)
      if (image) {
        formData.append('image', image)
      }
      await axios.put(
        `${process.env.NEXT_PUBLIC_API}/equip/${equipmentInfo.uuid}`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      )
      setOpen(false)
      window.location.reload()
    } catch (e) {
      alert('장비 정보 수정에 실패했습니다.')
      console.log(e)
    }
  }

  const ownerOptions = [
    { key: 'chonghak', text: '총학생회', value: 'chonghak' },
    { key: 'dongyeon', text: '동아리연합회', value: 'dongyeon' },
    { key: 'dormUnion', text: '생활관자치회', value: 'dormUnion' },
    { key: 'saengna', text: '생각나눔', value: 'saengna' },
    { key: 'others', text: '그 외', value: 'others' },
  ]

  return (
    <Modal
      open={open} trigger={props.trigger}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>장비 수정</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group>
            <Form.Input
              required
              label={'장비 이름'}
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Form.Select
              required
              label={'장비 소속'}
              value={equip_owner}
              options={ownerOptions}
              onChange={(e, { value }) => setEquipOwner(value)}
            />
          </Form.Group>
          <Form.Input
            required
            label={'예약 비용'}
            value={fee}
            onChange={e => setFee(e.target.value)}
          />
          <Form.TextArea
            required
            label={'설명'}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <Form.Input
            label={'담당자 이메일'}
            placeholder="장비 예약을 처리할 담당자의 이메일을 작성해주세요"
            value={staff_email}
            onChange={e => setStaffEmail(e.target.value)}
          />
          <p>장비 예약이 생성되면, 담당자 메일로 예약 생성 메일이 갑니다.</p>
          <Form.Input
            label={'장비 사진'}
            type={'file'}
            onChange={e => setImage(e.target.files[0])}
          />
          <p>이미지가 없으면 기본 이미지가 표시됩니다.</p>
          <div style={{ margin: '10px 0' }}>
            <Image
              src={`${process.env.NEXT_PUBLIC_API}/equip/image/${equipmentInfo.imageName}`
              ?? 'https://react.semantic-ui.com/images/wireframe/image.png'}
              atl={"equipment_image"}
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
                deleteURI={`equip/${equipmentInfo.uuid}`}
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

export default EquipmentUpdateModal