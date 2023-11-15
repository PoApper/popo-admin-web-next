import { Form } from "semantic-ui-react"
import { CsvUpload } from "@/utils/file-upload";

const CsvUploadForm = ({ label, uploadUri }) => {
  return (
    <Form>
      <Form.Input
        label={label}
        type={'file'}
        accept={'csv'}
        onChange={async (evt) => {
          const file = evt.target.files[0]
          await CsvUpload(uploadUri, file);
          alert('업로드가 완료 되었습니다!');
        }}
      />
    </Form>
  )
}

export default CsvUploadForm;
