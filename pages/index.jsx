import Layout from '../components/layout'

export default function Home () {
  return (
    <Layout>
      <h1>안녕하세요, POPO 관리자 페이지 입니다🙌</h1>
      <p>
        이곳에서 POPO 사이트의 기능과 데이터베이스를 관리할 수 있습니다. 새로운 장비와 장소를 추가해 대여할 수도 있죠. POPO를 가꾸는 것은 여러분 손에 달려 있습니다.
      </p>
      <img src={"/home_background.jpg"} alt={"home_background"}/>
    </Layout>
  )
}
