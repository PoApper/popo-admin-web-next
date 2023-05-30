import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { PoPoAxios } from "../../utils/axios.instance";

const NewUserBar = () => {
  const [barData, setBarData] = useState([])

  useEffect(() => {
    const thisMonth = moment().format('YYYYMM')
    PoPoAxios.get(`/statistics/user?start=202102&end=${thisMonth}`).
      then((res) => {
        // process data format
        const barData = []
        for (const [key, value] of Object.entries(res.data.data)) {
          barData.push({
            'month': key,
            'new-user': value
          })
        }
        setBarData(barData)
      })
  }, [])

  return (
    <>
      <ResponsiveBar
        data={barData}
        keys={['new-user']}
        indexBy={'month'}
        isInteractive={false}
        minValue={0}
        margin={{ top: 10, right: 50, bottom: 30, left: 50 }}
      />
    </>
  )
}

export default NewUserBar