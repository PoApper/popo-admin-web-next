import Layout from '../layout'
import IntroduceMenubar from './introduce.menubar'

const IntroduceLayout = ({ children }) => {
  return (
    <Layout>
      <h2>소개글 관리</h2>
      <IntroduceMenubar/>
      { children }
    </Layout>
  )
}

export default IntroduceLayout