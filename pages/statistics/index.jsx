import { useState } from "react";
import dynamic from 'next/dynamic';
import { Dropdown, List } from "semantic-ui-react";


import LayoutWithAuth from '@/components/layout/layout.auth.with'

// https://github.com/plouc/nivo/issues/1941
const NewUserBar = dynamic(() => import('@/components/statistics/new-user.bar'), { ssr: false })
const NewReservationBar = dynamic(() => import('@/components/statistics/new-reservation.bar'), { ssr: false })

const YearOptions = [
  {
    key: 2021,
    text: '2021년',
    value: 2021,
  },
  {
    key: 2022,
    text: '2022년',
    value: 2022,
  },
  {
    key: 2023,
    text: '2023년',
    value: 2023,
  }
]

const StatisticsPage = () => {
  const [year, setYear] = useState(2023);

  return (
    <LayoutWithAuth>
      <h2>POPO 통계</h2>
      <p>
        We don&apos;t have better algorithms, we just have more data.<br/>
        데이터를 통해 POPO를 유연하게 관리하고 활용해봅시다!
      </p>
      <div>
        <Dropdown
          placeholder={'Select Year'}
          options={YearOptions}
          value={year}
          onChange={(_, { value }) => {
            setYear(value)
          }}
        />
      </div>
      <h3>신규 유저</h3>
      <div style={{ height: 360 }}>
        <NewUserBar year={year}/>
      </div>
      <hr/>
      <h3>신규 장소 예약</h3>
      <div style={{ height: 360 }}>
        <NewReservationBar year={year}/>
      </div>
      <hr/>
      <h3>ToDo List 🚀</h3>
      <List as="ul">
        <List.Item as="li">일일 활성 유저 (Daily Active User)</List.Item>
      </List>
    </LayoutWithAuth>
  )
}

export default StatisticsPage