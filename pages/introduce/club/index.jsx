import React from 'react'
import { Button } from 'semantic-ui-react'

import IntroduceLayout from '@/components/introduce/introduce.layout'
import ClubTable from '@/components/introduce/club.table'
import ClubCreateModal from '@/components/introduce/club.create.modal'
import { PoPoAxios } from '@/utils/axios.instance';

const ClubIntroducePage = ({ clubList }) => {
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
          clubs={clubList}
        />
      </div>
    </IntroduceLayout>
  )
}

export default ClubIntroducePage;

export async function getServerSideProps() {
  const res = await PoPoAxios.get('introduce/club');
  const clubList = res.data;

  return { props: { clubList } };
}
