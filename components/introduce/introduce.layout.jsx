import LayoutMain from '../layout.main'
import IntroduceMenubar from './introduce.menubar'

const IntroduceLayout = ({ children }) => {
  return (
    <LayoutMain>
      <h2>소개글 관리</h2>
      <IntroduceMenubar/>
      { children }
    </LayoutMain>
  )
}

export default IntroduceLayout