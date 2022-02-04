import LayoutMain from '../layout.main'
import BoardMenubar from './board.menubar'

const BoardLayout = ({ children }) => {
  return (
    <LayoutMain>
      <h2>게시물 관리</h2>
      <BoardMenubar/>
      {children}
    </LayoutMain>
  )
}

export default BoardLayout