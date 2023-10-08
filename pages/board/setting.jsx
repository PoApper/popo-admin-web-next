import { useEffect, useState } from 'react'
import { Form } from 'semantic-ui-react'

import BoardLayout from '@/components/board/board.layout'
import { PoPoAxios, PopoCdnAxios } from '@/utils/axios.instance';

const SettingPage = () => {
  const [popoCRMEmail, setPOPOCRMEmail] = useState('');
  const [dongyeonBank, setDongyeonBank] = useState('');
  const [dongyeonServiceTime, setDongyeonServiceTime] = useState('');
  const [donyeonContact, setDongyeonContact] = useState('');

  useEffect(() => {
    PoPoAxios.get('/setting')
      .then((res) => {
        setPOPOCRMEmail(res.data.popo_crm_email);
        setDongyeonBank(res.data.dongyeon_bank);
        setDongyeonServiceTime(res.data.dongyeon_service_time);
        setDongyeonContact(res.data.dongyeon_contact);
      }).catch((err) => {
        const errMsg = err.response.data.message;
        alert(`설정값을 불러오는데 실패했습니다.\n${errMsg}`);
      })
  }, [])

  function handleSubmit () {
    PoPoAxios.post('/setting', {
      popo_crm_email: popoCRMEmail,
      dongyeon_bank: dongyeonBank,
      dongyeon_service_time: dongyeonServiceTime,
      dongyeon_contact: donyeonContact,
    }, {withCredentials: true})
      .then(() => alert('설정값을 저장했습니다!'))
      .catch((err) => {
        const errMsg = err.response.data.message;
        alert(`설정값을 저장하는데 실패했습니다.\n${errMsg}`);
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
        <Form.Input
          label={'동아리 연합회 대여시간'}
          value={dongyeonBank}
          onChange={e => setDongyeonServiceTime(e.target.value)}
        />
        <Form.Input
          label={'동아리 연합회 문의 번호'}
          value={dongyeonBank}
          onChange={e => setDongyeonContact(e.target.value)}
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