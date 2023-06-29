import { Button, Form, Icon, Image, Modal } from 'semantic-ui-react'
import { useState } from 'react'
import DeleteConfirmModal from '../common/delete.confirm.modal'
import { popoApiUrl, PoPoAxios } from '@/utils/axios.instance';

const ClubUpdateModal = ({ club, trigger}) => {
  const [open, setOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [name, setName] = useState(club.name)
  const [short_desc, setShortDesc] = useState(club.short_desc)
  const [clubType, setClubType] = useState(club.clubType)
  const [content, setContent] = useState(club.content)
  const [location, setLocation] = useState(club.location)
  const [representative, setRepresentative] = useState(club.representative)
  const [contact, setContact] = useState(club.contact)
  const [logo, setLogo] = useState()
  const [homepageUrl, setHomepageUrl] = useState(club.homepage_url)
  const [facebookUrl, setFacebookUrl] = useState(club.facebook_url)
  const [instagramUrl, setInstagramUrl] = useState(club.instagram_url)

  const handleSubmit = async () => {
    try {
      let formData = new FormData()
      formData.append('name', name)
      formData.append('short_desc', short_desc)
      formData.append('clubType', clubType)
      formData.append('content', content)
      formData.append('location', location)
      formData.append('representative', representative)
      formData.append('contact', contact)
      formData.append('homepage_url', homepageUrl)
      formData.append('facebook_url', facebookUrl)
      formData.append('instagram_url', instagramUrl)
      if (logo) {
        formData.append('logo', logo)
      }
      await PoPoAxios.put(`/introduce/club/${club.uuid}`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      )
      setOpen(false)
      window.location.reload()
    } catch (e) {
      alert('동아리 정보 수정에 실패했습니다.')
      console.log(e)
    }
  }

  const clubTypeOptions = [
    {key: 'performance1', text: '공연1', value: 'performance1'},
    {key: 'performance2', text: '공연2', value: 'performance2'},
    {key: 'societyAndReligion', text: '사회종교', value: 'societyAndReligion'},
    {key: 'sports', text: '체육', value: 'sports'},
    {key: 'hobbyAndExhibition', text: '취미전시', value: 'hobbyAndExhibition'},
    {key: 'study', text: '학술', value: 'study'},
  ]

  return (
    <Modal
      closeIcon
      open={open} trigger={trigger}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>동아리 정보 수정</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            required
            label={'동아리 이름'}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Form.Input
            required
            label={'짧은 설명'}
            placeholder={'예: 개발, 축구, 재즈'}
            value={short_desc}
            onChange={e => setShortDesc(e.target.value)}
          />
          <Form.Select
            required
            label={'분과'}
            options={clubTypeOptions}
            value={clubType}
            onChange={e => setClubType(e.target.value)}
          />
          <Form.TextArea
            required
            label={'소개글'}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <Form.Input
            required
            label={'위치'}
            placeholder={'예: 학생회관 OOO호'}
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <Form.Input
            required
            label={'대표자'}
            placeholder={'홍길동'}
            value={representative}
            onChange={e => setRepresentative(e.target.value)}
          />
          <Form.Input
            required
            label={'연락처'}
            placeholder={'OOOOO@postech.ac.kr'}
            value={contact}
            onChange={e => setContact(e.target.value)}
          />
          <Form.Input
            label={'홈페이지 링크'}
            placeholder={"https://OOOOOOO"}
            value={homepageUrl}
            onChange={e => setHomepageUrl(e.target.value)}
          />
          <Form.Input
            label={'페이스북'}
            placeholder={"https://www.facebook.com/profile.php?id=OOOOOOOO"}
            value={facebookUrl}
            onChange={e => setFacebookUrl(e.target.value)}
          />
          <Form.Input
            label={'인스타그램'}
            placeholder={"https://www.instagram.com/OOOOOO"}
            value={instagramUrl}
            onChange={e => setInstagramUrl(e.target.value)}
          />
          <Form.Input
            label={'동아리 로고'}
            type={'file'}
            onChange={e => setLogo(e.target.files[0])}
          />
          <p>이미지가 없으면 기본 이미지가 표시됩니다.</p>
          <div style={{ margin: '10px 0' }}>
            <Image
              src={`${popoApiUrl}/introduce/club/image/${club.logoName}`
              ?? 'https://react.semantic-ui.com/images/wireframe/image.png'}
              alt={"club_image"}
              size={'medium'}
            />
          </div>
          <Modal.Actions>
            <Form.Group>
              <Form.Button
                type={'submit'}
                onClick={handleSubmit}>
                수정
              </Form.Button>
              <DeleteConfirmModal
                open={deleteModalOpen}
                target={name}
                deleteURI={`introduce/club/${club.uuid}`}
                trigger={(
                  <Button negative
                          onClick={() => setDeleteModalOpen(true)}>
                    <Icon name={'trash'}/> 삭제
                  </Button>)}
              />
            </Form.Group>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default ClubUpdateModal