import IntroduceLayout from '../../components/introduce/introduce.layout'
import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import ClubTable from '../../components/introduce/club.table'
import ClubCreateModal from '../../components/introduce/club.create.modal'
import { PoPoAxios } from "../../utils/axios.instance";

const ClubIntroducePage = () => {
  const [clubs, setClubs] = useState([])

  useEffect(() => {
    PoPoAxios
      .get('/introduce/club')
      .then((res) => setClubs(res.data))
      .catch((err) => {
        alert('동아리 목록을 불러오는데 실패했습니다.')
        console.log(err)
      })
  }, [])

  return (
    <IntroduceLayout>
      <h3>동아리 소개글</h3>
      <div style={{ marginBottom: '1rem' }}>
        <ClubCreateModal
          trigger={<Button>동아리 생성</Button>}
        />
      </div>
      <div>
        <ClubTable
          clubs={clubs}
        />
      </div>
    </IntroduceLayout>
  )
}

export default ClubIntroducePage