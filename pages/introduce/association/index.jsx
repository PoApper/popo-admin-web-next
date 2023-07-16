import React from 'react'
import { Button } from 'semantic-ui-react'

import IntroduceLayout from '@/components/introduce/introduce.layout'
import AssociationTable from '@/components/introduce/association.table'
import AssociationCreateModal
  from '@/components/introduce/association.create.modal'
import { PoPoAxios } from "@/utils/axios.instance";

const AssociationIntroducePage = ({ associationList }) => {
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
          associations={associationList}
        />
      </div>
    </IntroduceLayout>
  )
}

export default AssociationIntroducePage;

export async function getServerSideProps() {
  const res = await PoPoAxios.get('introduce/association');
  const associationList = res.data;

  return { props: { associationList } };
}
