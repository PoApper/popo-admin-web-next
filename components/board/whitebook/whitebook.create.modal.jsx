import { Form, Modal, Radio } from 'semantic-ui-react';
import { useState } from 'react';
import { PoPoAxios } from '@/utils/axios.instance';
import { PdfUpload } from '@/utils/file-upload';

const WhitebookCreateModal = (props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showOnlyLogin, setShowOnlyLogin] = useState(false);

  // PDF 또는 링크 선택 관련 상태
  const [inputType, setInputType] = useState('link'); // 기본값은 'link'
  const [link, setLink] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (file) => {
    if (!file || file.type !== 'application/pdf') {
      alert('PDF 파일만 업로드 가능합니다.');
      setPdfFile(null); // 잘못된 파일 초기화
      return;
    }
    setPdfFile(file); // 올바른 PDF 파일 설정
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('show_only_login', showOnlyLogin);

      // PDF 업로드 처리
      if (inputType === 'pdf' && pdfFile) {
        try {
          await PdfUpload('/upload/pdf', pdfFile); // PDF 업로드
          formData.append('pdf_uploaded', true); // 업로드 상태 전달
        } catch (err) {
          const errMsg =
            err.response?.data?.message || 'PDF 업로드 중 오류가 발생했습니다.';
          alert(`PDF 업로드에 실패했습니다.\n${errMsg}`);
          return; // 업로드 실패 시 생성 요청 중단
        }
      }

      // 링크 입력 처리
      if (inputType === 'link' && link) {
        formData.append('link', link);
      }

      // 데이터 전송
      await PoPoAxios.post('/whitebook', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      setOpen(false);
      window.location.reload();
    } catch (e) {
      alert('생활백서 생성에 실패했습니다.');
      console.log(e);
    }
  };

  return (
    <Modal
      closeIcon
      open={open}
      trigger={props.trigger}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>생활백서 생성</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            required
            label={'생활백서 제목'}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* PDF 또는 링크 선택 */}
          <Form.Group inline>
            <label>파일 타입 선택:</label>
            <Form.Field>
              <Radio
                label="링크 입력"
                name="inputType"
                value="link"
                checked={inputType === 'link'}
                onChange={() => {
                  setInputType('link');
                  setPdfFile(null); // PDF 파일 초기화
                }}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="PDF 업로드"
                name="inputType"
                value="pdf"
                checked={inputType === 'pdf'}
                onChange={() => {
                  setInputType('pdf');
                  setLink(''); // 링크 입력 초기화
                }}
              />
            </Form.Field>
          </Form.Group>

          {/* 조건부 렌더링: 링크 입력 필드 */}
          {inputType === 'link' && (
            <Form.Input
              required
              label={'생활백서 링크'}
              placeholder={'https://xxxx.postech.ac.kr'}
              onChange={(e) => setLink(e.target.value)}
            />
          )}

          {/* 조건부 렌더링: PDF 업로드 필드 */}
          {inputType === 'pdf' && (
            <Form.Input
              required
              type="file"
              label={'생활백서 PDF'}
              accept="application/pdf"
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
          )}

          <Form.TextArea
            required
            label={'생활백서 설명글'}
            onChange={(e) => setContent(e.target.value)}
          />
          <Form.Checkbox
            required
            label={'로그인 유저에게만 보이기'}
            value={showOnlyLogin}
            onChange={() => setShowOnlyLogin(!showOnlyLogin)}
          />

          <Modal.Actions>
            <Form.Button type={'submit'} onClick={handleSubmit}>
              생성
            </Form.Button>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default WhitebookCreateModal;
