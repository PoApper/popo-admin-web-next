import opening_hours from 'opening_hours'
import { Form, Message } from 'semantic-ui-react'

const OpeningHoursEditor = ({openingHour, setOpeningHours}) => {

  function checkValid (opening_hour) {
    try {
      new opening_hours(opening_hour)
      return true;
    } catch (err) {
      return false
    }
  }

  const isValid = checkValid(openingHour);

  return (
    <div style={{marginBottom: 8}}>
      <Form.TextArea
        required
        label={'예약 가능 시간'}
        value={openingHour}
        onChange={e => setOpeningHours(e.target.value)}
        style={{color: isValid ? "green" : "red"}}
        error={!isValid}
      />
      <div>
        예약 가능 시간은 OpenStreetMap의
        <a href={"https://wiki.openstreetmap.org/wiki/Key:opening_hours"} target={'_blank'} rel={'noreferrer'}>
          opening_hours 형식
        </a>을 따릅니다.
        <Message>
          <Message.Header>
            형식 예시
          </Message.Header>
          <Message.List>
            <Message.Item>`24/7`: 매일 24시간 예약 가능</Message.Item>
            <Message.Item>`Wed 12:00-22:00;`: 수요일 12:00 ~ 22:00 예약 가능</Message.Item>
            <Message.Item>`Mo-Fr 10:00-20:00`: 평일 10:00 ~ 20:00 예약 가능</Message.Item>
            <Message.Item>`open; Th 20:00-22:00 off;`: 목요일 20:00 ~ 22:00 제외하고 예약 가능</Message.Item>
          </Message.List>
        </Message>
      </div>
    </div>
  )
}

export default OpeningHoursEditor;
