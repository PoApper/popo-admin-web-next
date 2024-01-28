import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router';
import moment from 'moment'
import { Divider, Form, Message } from 'semantic-ui-react';

import ReservationLayout from '@/components/reservation/reservation.layout'
import { PoPoAxios } from '@/utils/axios.instance';
import { RegionOptions } from '@/assets/region.options';
import { roundUpByDuration } from '@/utils/time-date';

const RegionKorNameMapping = {
  STUDENT_HALL: '학생 회관',
  JIGOK_CENTER: '지곡 회관',
  OTHERS: '기타',
  COMMUNITY_CENTER : '커뮤니티 센터',
  RESIDENTIAL_COLLEGE: 'RC',
}

const PlaceReservationCreatePage = ({ placeList }) => {
  const router = useRouter()

  const [region, setRegion] = useState()

  const filteredPlaceList = useMemo(() => {
    return placeList.filter(place => place.region === region);
  }, [region, placeList]);

  const placeOptions = filteredPlaceList.map(place => { return {
    key: place.id,
    value: place,
    text: place.name,
  }})

  const [placeInfo, setPlaceInfo] = useState({})
  const [userInfo, setUserInfo] = useState(null)

  const [phone, setPhone] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const now = roundUpByDuration(moment(), 30);
  const nowNext30Min = moment(now).add(30, 'minute');

  const [date, setDate] = useState(now) // YYYY-MM-DD
  const [startTime, setStartTime] = useState(now) // HHmm
  const [endTime, setEndTime] = useState(nowNext30Min) // HHmm

  useEffect(() => {
    PoPoAxios.get(
      '/auth/verifyToken',
      { withCredentials: true }).
      then(res => setUserInfo(res.data)).
      catch(() => {
        // alert('로그인 후 예약 할 수 있습니다.');
        // router.push('/auth/login');
      })
  }, [router])

  return (
    <ReservationLayout>
      <h1>장소 예약 생성 (관리자)</h1>

      <Message>
        일반 유저는 한달 이내 예약만 생성 가능하지만, 관리자 페이지에서는 한달 이후 예약도 생성 가능합니다.
      </Message>

      <Form>
        <Form.Group>
          <Form.Select
            required label={'지역'} name="region"
            options={RegionOptions}
            value={region}
            onChange={(e, { value }) => setRegion(value)}
          />
          <Form.Select
            required label={'장소'} name="place"
            options={placeOptions}
            value={placeOptions.id}
            onChange={(e, { value }) => setPlaceInfo(value)}
          />
        </Form.Group>

        <Form.Input
          required readOnly label={'사용자'}
          value={userInfo ? userInfo.name : ''}/>

        <Form.Input
          required label={'전화번호'}
          placeholder={'010-xxxx-xxxx'}
          onChange={e => setPhone(e.target.value)}/>
        <Form.Input
          required label={'예약 제목'}
          placeholder={'예약 제목을 작성해주세요.'}
          onChange={e => setTitle(e.target.value)}/>
        <Form.TextArea
          required label={'설명'}
          placeholder={'사용 인원을 꼭 작성 해주세요.'}
          onChange={e => setDescription(e.target.value)}/>

        <Divider/>


      </Form>

    </ReservationLayout>
  )
}

export default PlaceReservationCreatePage;

export async function getServerSideProps() {
  const res = await PoPoAxios.get('place');
  const placeList = res.data;

  return { props: { placeList } };
}
