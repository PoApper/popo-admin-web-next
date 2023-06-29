import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'

import IntroduceLayout from '@/components/introduce/introduce.layout'
import AssociationTable from '@/components/introduce/association.table'
import AssociationCreateModal
  from '@/components/introduce/association.create.modal'
import { PoPoAxios } from "@/utils/axios.instance";

const AssociationIntroducePage = () => {
  const [associations, setAssociations] = useState([])

  useEffect(() => {
    PoPoAxios
      .get('/introduce/association')
      .then((res) => setAssociations(res.data))
      .catch((err) => {
        alert('자치단체 목록을 불러오는데 실패했습니다.')
        console.log(err)
      })
  }, [])

  return (
    <IntroduceLayout>
      <h3>자치단체 소개글</h3>
      <div style={{ marginBottom: '1rem' }}>
        <AssociationCreateModal
          trigger={<Button>자치단체 생성</Button>}
        />
      </div>
      <div>
        <AssociationTable
          associations={associations}
        />
      </div>
    </IntroduceLayout>
  )
}

export default AssociationIntroducePage