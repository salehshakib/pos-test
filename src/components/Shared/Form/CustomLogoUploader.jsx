import { GlobalUtilityStyle } from "../../../container/Styled";

const CustomLogoUploader = () => {
  return (
    <GlobalUtilityStyle>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      <Form.Item
        label={label}
        name={name}
        rules={[{ required: required, message: `Please input ${label}!` }]}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          listType="picture-card"
          name={"file"}
          fileList={fileList}
          onChange={handleFileChange}
          onPreview={handlePreview}
          beforeUpload={(file) => {
            setFileList([...fileList, file]);
            return false;
          }}
          multiple={multiple}
          maxCount={multiple ? 20 : 2}
        >
          {(fileList.length < 2 || multiple) && (
            <button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
              className="w-full flex flex-col items-center justify-center"
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
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default CustomLogoUploader;
