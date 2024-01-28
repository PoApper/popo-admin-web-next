import React, { useEffect, useState } from 'react'
import { Pagination } from 'semantic-ui-react'

import ReservationLayout from '@/components/reservation/reservation.layout'
import PlaceReservationTable
  from '@/components/place/place.reservation.table'
import { PoPoAxios } from '@/utils/axios.instance';

const PlaceReservationCreatePage = () => {

  return (
    <ReservationLayout>
      <h1>장소 예약 생성 (관리자)</h1>

    </ReservationLayout>
  )
}

export default PlaceReservationCreatePage;
