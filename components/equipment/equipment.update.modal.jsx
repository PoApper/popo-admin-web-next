import { Button, Form, Icon, Modal } from 'semantic-ui-react'
import { useState } from 'react'
import { OwnerOptions } from '@/assets/owner.options'
import { PoPoAxios, PopoCdnUrl } from "@/utils/axios.instance";
import DeleteConfirmModal from '../common/delete.confirm.modal'
import ImageUploadForm from '../common/image-upload.form'

const EquipmentUpdateModal = ({ equipmentInfo, trigger }) => {
  const [open, setOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const [name, setName] = useState(equipmentInfo.name)
  const [equip_owner, setEquipOwner] = useState(equipmentInfo.equip_owner)
  const [fee, setFee] = useState(equipmentInfo.fee)
  const [description, setDescription] = useState(equipmentInfo.description)
  const [staff_email, setStaffEmail] = useState(equipmentInfo.staff_email)
  const [max_minutes, setMaxMinutes] = useState(equipmentInfo.max_minutes)

  const handleSubmit = async () => {
    const body = {
      'name': name,
      'equip_owner': equip_owner,
      'fee': fee,
      'description': description,
      'staff_email': staff_email,
    };

    if (max_minutes) {
      body['max_minutes'] = max_minutes;
    }

    PoPoAxios.put(`/equip/${equipmentInfo.uuid}`,
      body,
      { withCredentials: true },
    ).then(() => {
      setOpen(false);
      window.location.reload();
    }).catch((err) => {
      alert('장비 정보 수정에 실패했습니다.')
      console.log(err);
    });
  }

  return (
    <Modal
      open={open} trigger={trigger}
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
              options={OwnerOptions}
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
              label={'최대 예약가능 기간(단위: 분)'}
              placeholder={'해당 장비를 예약가능한 최대 시간을 분단위로 입력해주세요 (ex. 60)'}
              value={max_minutes}
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

          <ImageUploadForm
            type={'장비'}
            uploadApiUri={`equip/image/${equipmentInfo.uuid}`}
            originalImageUrl={`${PopoCdnUrl}/equip/${equipmentInfo.uuid}`}
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