import { Form, Modal } from 'semantic-ui-react'
import { useState } from 'react'
import axios from 'axios'

const EquipmentCreateModal = (props) => {
  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [equip_owner, setEquipOwner] = useState('')
  const [fee, setFee] = useState('')
  const [description, setDescription] = useState('')
  const [staff_email, setStaffEmail] = useState('')
  const [max_minutes, setMaxMinutes] = useState()
  const [image, setImage] = useState()

  const handleSubmit = async () => {
    try {
      let formData = new FormData()
      formData.append('name', name)
      formData.append('equip_owner', equip_owner)
      formData.append('fee', fee)
      formData.append('description', description)
      formData.append('staff_email', staff_email)
      if (max_minutes) {
        formData.append('max_minutes', max_minutes)
      }
      if (image) {
        formData.append('image', image)
      }
      await axios.post(
        `${process.env.NEXT_PUBLIC_API}/equip`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      )
      setOpen(false)
      window.location.reload()
    } catch (e) {
      alert('장비 생성에 실패했습니다.')
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
      <Modal.Header>장비 생성</Modal.Header>
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
          <Form.Input
              label={'최대 예약가능 시간'}
              placeholder={'해당 장비를 예약가능한 최대 시간을 분단위로 입력해주세요 (ex. 60)'}
              onChange={e => setMaxMinutes(e.target.value)}
          />
          <p>최대 예약가능 시간이 넘는 예약이 생성되지 않도록 합니다.</p>
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

export default EquipmentCreateModal