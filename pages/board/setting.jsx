import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Form } from 'semantic-ui-react'
import BoardLayout from '../../components/board/board.layout'

const SettingPage = () => {
  const [popoCRMEmail, setPOPOCRMEmail] = useState('');
  const [dongyeonBank, setDongyeonBank] = useState('');

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/setting`)
         .then((res) => {
           setPOPOCRMEmail(res.data.popo_crm_email);
           setDongyeonBank(res.data.dongyeon_bank);
          })
          .catch((err) => { alert('설정값을 불러오는데 실패했습니다.') })
  }, [])

  function handleSubmit () {
    axios.post(`${process.env.NEXT_PUBLIC_API}/setting`, {
      popo_crm_email: popoCRMEmail,
      dongyeon_bank: dongyeonBank,
    }, {withCredentials: true})
      .then(() => alert('설정값을 저장했습니다!'))
      .catch((err) => {
        console.log(err);
        alert('설정값을 저장하는데 실패했습니다.')
        
      })
  }

  return (
    <BoardLayout>
      <h3>POPO 설정값</h3>
      <p>
        이곳에서 동적으로 변경할 수 있는 POPO 설정값을 채울 수 있습니다. 추가를 원하는게 설정값이 있으면 POPO 개발팀으로 문의 부탁드립니다.
      </p>

      <Form>
        <Form.Input
          label={'POPO 문의 이메일'}
          value={popoCRMEmail}
          onChange={e => setPOPOCRMEmail(e.target.value)}
        />
        <Form.Input
          label={'동아리 연합회 계좌 (장비 예약비)'}
          value={dongyeonBank}
          onChange={e => setDongyeonBank(e.target.value)}
        />

        <Form.Button 
          primary
          type={'submit'} 
          onClick={handleSubmit}>
          저장
        </Form.Button>
      </Form>

    </BoardLayout>
  )
}

export default SettingPage