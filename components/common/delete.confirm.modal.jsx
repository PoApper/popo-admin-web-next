import { useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { PoPoAxios } from "../../utils/axios.instance";

const DeleteConfirmModal = (props) => {
  const deleteTarget = props.target
  const deleteURI = props.deleteURI
  const [open, setOpen] = useState(props.open)

  const handleDelete = async () => {
    try {
      await PoPoAxios.delete(`/${deleteURI}`,
        { withCredentials: true })
      window.location.reload()
    } catch (e) {
      alert('장소 삭제에 실패했습니다.')
      console.log(e)
    }
  }

  return (
    <Modal
      open={open} trigger={props.trigger}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>삭제 확인</Modal.Header>
      <Modal.Content>
        <b>{deleteTarget}</b>이 삭제 됩니다. 정말 삭제 하시겠습니까?
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="취소"
          onClick={() => setOpen(false)}
        />
        <Button
          negative
          icon="check"
          content="삭제"
          onClick={handleDelete}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteConfirmModal