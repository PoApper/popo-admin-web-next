import { Divider } from 'semantic-ui-react'
import styled from 'styled-components'
import BoardLayout from '@/components/board/board.layout'
import AffiliateCards from '@/components/board/affiliate.cards'
import DiscountOfferCards from '@/components/board/discount.cards'

import { affiliates, discountOffers } from './affiliate.data'; // Import the variable from the data.js file

const BenefitPage = () => {
  return (
    <BoardLayout>
      <h3>총학생회 제휴 업체 소개</h3>
        <AffiliateCards
          affiliates={affiliates}
        />
      <AffiliateDivider/>
      <h3>총학생회 할인 업체 소개</h3>
        <DiscountOfferCards
          discountOffers={discountOffers}
        />
    </BoardLayout>
  )
}

export default BenefitPage

const AffiliateDivider = styled(Divider)`  
  margin: 20px 0px 0px 0px;
  padding: 20px 0px 0px 0px;
`