import { Form, Image, Upload } from 'antd';
import { useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';

import { GlobalUtilityStyle } from '../../../container/Styled';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const normFile = (e) => {
  //console.log(e);
  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};

const CustomUploader = ({
  name,
  label,
  required = false,
  multiple = false,
  type = 'img',
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    //console.log(newFileList);

    setFileList(newFileList);
  };

  //console.log(defaultValue);

  return (
    <GlobalUtilityStyle>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
      <Form.Item
        label={<span className="mt-2 font-bold">{label}</span>}
        name={name}
        rules={[{ required: required, message: `Please input ${label}!` }]}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          listType="picture-card"
          name={'file'}
          fileList={fileList}
          onChange={handleFileChange}
          onPreview={handlePreview}
          beforeUpload={(file) => {
            setFileList([...fileList, file]);
            //console.log(file);
            return false;
          }}
          multiple={multiple}
          maxCount={multiple ? 20 : 1}
          className={` ${
            multiple
              ? 'custom-upload rounded-md border border-gray-400 pb-2 pl-2 pr-2 pt-2'
              : 'custom-single-upload'
          } mt-2`}
          accept={type === 'img' ? '.png, .jpg, .jpeg' : ''}
        >
          {(multiple || (!multiple && fileList.length < 1)) && (
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
              className="flex w-full flex-col items-center justify-center"
            >
              <BiImageAdd
                style={{
                  fontSize: 25,
                }}
              />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          )}
        </Upload>
        {/* </ImgCrop> */}
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default CustomUploader;
