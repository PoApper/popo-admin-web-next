import LayoutMain from '../layout.main'
import ReservationMenubar from './reservation.menubar'

const ReservationLayout = ({ children }) => {
  return (
    <LayoutMain>
      <h2>예약 관리</h2>
      <ReservationMenubar/>
      { children }
    </LayoutMain>
  )
}

export default ReservationLayout