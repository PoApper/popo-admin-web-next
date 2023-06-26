import { Form, Message, Modal } from "semantic-ui-react";
import { useState } from 'react'
import { RegionOptions } from '../../assets/region.options'
import OpeningHoursEditor, { checkValid } from '../common/opening_hours.editor'
import { PoPoAxios } from "../../utils/axios.instance";

const PlaceCreateModal = ({ trigger }) => {
  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [region, setRegion] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [staff_email, setStaffEmail] = useState('')
  const [max_minutes, setMaxMinutes] = useState()
  const [opening_hours, setOpeningHours] = useState({ Everyday: '00:00-24:00' })
  const [enable_auto_accept, setEnableAutoAccept] = useState('Inactive')

  const handleSubmit = async () => {
    for(const day of Object.keys(opening_hours)) {
      if (!checkValid(opening_hours[day])) {
        alert(`사용 가능 시간이 올바르지 않습니다: ${day}`)
        return;
      }
    }

    const body = {
      'name': name,
      'region': region,
      'location': location,
      'description': description,
      'staff_email': staff_email,
      'opening_hours': opening_hours,
      'enable_auto_accept': enable_auto_accept,
    }

    if (max_minutes) {
      body['max_minutes'] = max_minutes
    }

    await PoPoAxios.post('/place', 
      body,
      { withCredentials: true },
    ).then(() => {
      setOpen(false);
      window.location.reload();
    }).catch(err => {
      console.log(err);
      alert('장소 생성에 실패했습니다.');
    })
  }

  return (
    <Modal
      open={open} trigger={trigger}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>장소 생성</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Select
              required
              label={'지역'}
              placeholder={'지역을 선택하세요.'}
              options={RegionOptions}
              onChange={(e, { value }) => setRegion(value)}
            />
            <Form.Input
              required
              label={'장소 이름'}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Input
            required
            label={'위치'}
            placeholder={'예: 학생회관 304호'}
            onChange={e => setLocation(e.target.value)}
          />

          <Form.Input
              label={'최대 예약가능 시간'}
              placeholder={'해당 장소를 예약가능한 최대 시간을 분단위로 입력해주세요 (ex. 60)'}
              onChange={e => setMaxMinutes(e.target.value)}
          />
          <p>최대 예약가능 시간이 넘는 예약이 생성되지 않도록 합니다. (단위: minutes)</p>

          <OpeningHoursEditor
            currentOpeningHour={{ Everyday: '00:00-24:00' }}
            openingHour={opening_hours}
            setOpeningHours={setOpeningHours}
          />

          <Form.Select
            required
            toggle
            label={'자동 승인 기능 활성화'}
            value={enable_auto_accept}
            options={[
              {key: 'active', text: '활성', value: 'Active'},
              {key: 'inactive', text: '비활성', value: 'Inactive'},
            ]}
            onChange={(e, { value }) => setEnableAutoAccept(value)}
          />

          <Form.TextArea
            required
            label={'설명'}
            onChange={e => setDescription(e.target.value)}
          />

          <Form.Input
            label={'담당자 이메일'}
            placeholder="장소 예약을 처리할 담당자의 이메일을 작성해주세요"
            onChange={e => setStaffEmail(e.target.value)}
          />
          <p>장소 예약이 생성되면, 담당자 메일로 예약 생성 메일이 갑니다.</p>

          <Message>
            <Message.Header>장소 이미지</Message.Header>
            <p>
              장소 이미지는 장소 생성 후에 설정 할 수 있습니다.
              장소의 이미지가 없으면 기본 이미지가 표시됩니다.
            </p>
          </Message>

          <Modal.Actions>
            <Form.Button type={'submit'}>
              생성
            </Form.Button>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default PlaceCreateModal