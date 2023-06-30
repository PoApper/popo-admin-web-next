import React from 'react'
import { Button } from 'semantic-ui-react'
import ReservationLayout from '@/components/reservation/reservation.layout'
import PlaceTable from '@/components/place/place.table'
import Link from 'next/link'

const PlacePage = () => {
  return (
    <ReservationLayout>
      <h3>장소 목록</h3>
      <div style={{ marginBottom: '1rem' }}>
        <Link href={'/place/create'}>
          <Button>장소 생성</Button>
        </Link>
      </div>
      <p>
        장소는 마지막 수정일 순서로 정렬되어 표시됩니다!
      </p>
      <div>
        <PlaceTable/>
      </div>
    </ReservationLayout>
  )
}

export default PlacePage