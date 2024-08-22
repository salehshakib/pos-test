/* eslint-disable no-unused-vars */
import { Form } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { GlobalUtilityStyle } from '../../../container/Styled';

const module = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'code-block'],
    ['clean'],
  ],
};

const RichTextEditor = ({ value, onChange, name, required, label }) => {
  return (
    <GlobalUtilityStyle>
      <Form.Item
        label={label}
        name={name}
        rules={[{ required: required, message: `Please input ${label}!` }]}
      >
        <ReactQuill
          theme="snow"
          // value={value}
          // onChange={handleChange}
          modules={module}
          placeholder="Write something..."
          style={{ height: '200px' }}
          className="mb-10"
        />
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default RichTextEditor;
