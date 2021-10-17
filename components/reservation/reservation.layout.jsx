import Layout from '../layout'
import ReservationMenubar from './reservation.menubar'

const ReservationLayout = ({ children }) => {
  return (
    <Layout>
      <h2>예약 관리</h2>
      <ReservationMenubar/>
      { children }
    </Layout>
  )
}

export default ReservationLayout