import IntroduceLayout from '../../components/introduce/introduce.layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'semantic-ui-react'
import ClubTable from '../../components/introduce/club.table'
import ClubCreateModal from '../../components/introduce/club.create.modal'

const ClubIntroducePage = () => {
  const [clubs, setClubs] = useState([])

  useEffect(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/introduce/club`)
      setClubs(res.data)
    } catch (e) {
      alert('동아리 목록을 불러오는데 실패했습니다.')
      console.log(e)
    }
  }, [])

  return (
    <IntroduceLayout>
      <h3>동아리 소개글</h3>
      <div style={{ marginBottom: '1rem' }}>
        <ClubCreateModal
          trigger={<Button>동아리 생성</Button>}
        />
      </div>
      <p>소개글은 업데이트 순서로 정렬되어 표시됩니다!</p>
      <div>
        <ClubTable
          clubs={clubs}
        />
      </div>
    </IntroduceLayout>
  )
}

export default ClubIntroducePage