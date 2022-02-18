import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const NewReservationBar = () => {

  const [rawData, setRawData] = useState([])
  const [barData, setBarData] = useState([])

  useEffect(() => {
    const nextMonth = moment().add(1, 'M')
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/statistics/reservation?start=202101&end=${nextMonth}`).
      then((res) => {
        setRawData(res.data.data)

        // process data format
        const barData = []
        for (const [key, value] of Object.entries(res.data.data)) {
          barData.push({
            'month': key,
            'new-reservation': value,
          })
        }
        setBarData(barData)
      })
  }, [])

  return (
    <>
      <ResponsiveBar
        data={barData}
        keys={['new-reservation']}
        indexBy={'month'}
        minValue={0}
        isInteractive={false}
        colors={{ scheme: 'accent' }}
        margin={{ top: 10, right: 50, bottom: 30, left: 50 }}
      />
    </>
  )
}

export default NewReservationBar