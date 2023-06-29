import Link from 'next/link'
import { Button, Image } from 'semantic-ui-react'
import LoginLayout from '@/components/layout.raw'

const ErrorPage = () => {
  return (
    <LoginLayout>
      <Image
        src={'/popo.svg'}
        alt={'popo_logo'}/>
      <h2>
        잘못된 주소이거나 현재 개발중인 페이지 입니다 🙏
      </h2>
      <Link href={'/'} passHref>
        <Button>
          홈으로 이동
        </Button>
      </Link>
    </LoginLayout>
  )
}

export default ErrorPage