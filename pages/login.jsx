import { useState } from 'react'
import { useRouter } from 'next/router'
import { Form, Image } from 'semantic-ui-react'
import styled from 'styled-components'
import axios from 'axios'
import LoginLayout from '../components/login_layout'

const LoginPage = () => {
  const router = useRouter()

  const [id, setID] = useState('')
  const [password, setPW] = useState('')

  const handleLogin = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/login/admin`, {
        id: id,
        password: password
      }, {withCredentials: true})
      await router.push('/');
    } catch (e) {
      alert('로그인에 실패했습니다.')
      console.log(e)
    }
  }

  return (
    <LoginLayout>
      <Image
        src={'/popo.svg'}
      />
      <SubTitle>관리자 페이지</SubTitle>
      <div style={{width: "500px"}}>
        <Form>
          <Form.Input
            required
            label={'아이디'}
            onChange={(e) => setID(e.target.value)}
          />
          <Form.Input
            required
            type={'password'}
            label={'비밀번호'}
            onChange={(e) => setPW(e.target.value)}
          />
          <Form.Button onClick={handleLogin}>
            로그인
          </Form.Button>
        </Form>
      </div>

    </LoginLayout>
  )
}

export default LoginPage

const SubTitle = styled.h2`
  margin-top: 0;
  font-size: 26px !important;
  font-weight: 500;
`