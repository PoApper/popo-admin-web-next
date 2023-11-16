import { useState } from "react";
import { Button, Form } from "semantic-ui-react"
import { CsvUpload } from "@/utils/file-upload";

const CsvUploadForm = ({ label, uploadUri }) => {
  const [uploadedFile, setUploadedFile] = useState(null)

  return (
    <Form>
      <Form.Input
        label={label}
        type={'file'}
        accept={'csv'}
        onChange={async (evt) => {
          const file = evt.target.files[0];
          setUploadedFile(file);
        }}
      />

      <Button onClick={async () => {
          CsvUpload(uploadUri, uploadedFile)
          .then(res => {
            alert('업로드가 완료 되었습니다!');
          })
          .catch(err => {
            const errMsg = err.response.data.message;
            alert(`업로드에 실패했습니다.\n${errMsg}`);
          })
      }}>
        업로드
      </Button>
    </Form>
  )
}

export default CsvUploadForm;
