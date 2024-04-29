import { Button, Col, Form, Image, Input, Row, Upload } from "antd";
import { useState } from "react";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import CustomForm from "../../../../components/Shared/Form/CustomForm";

// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 8,
//     },
//     // lg: {
//     //   span: 8,
//     // },
//   },
//   wrapperCol: {
//     xs: {
//       span: 16,
//     },
//     // lg: {
//     //   span: 10,
//     // },
//   },
// };

const rowLayout = {
  gutter: 25,
  align: "middle",
  justify: "start",
};

const colLayout = {
  xs: 24,
  md: 12,
  lg: 8,
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const GeneralSettingForm = () => {
  const [form] = Form.useForm();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <CustomForm
      // handleSubmit={handleSubmit}
      className=""
      // fields={fields}
      // isLoading={isLoading}
    >
      <Row {...rowLayout} className="">
        <Col xs={24} className="flex flex-col items-center justify-center">
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
            // label={}
            name={name}
            // rules={[{ required: required, message: `Please input ${label}!` }]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            className=""
            style={{
              marginBottom: 0,
            }}
          >
            <Upload
              listType="picture-circle"
              name={"avatar"}
              fileList={fileList}
              onChange={handleFileChange}
              onPreview={handlePreview}
              beforeUpload={(file) => {
                setFileList([...fileList, file]);
                return false;
              }}
              maxCount={1}
              className=" custom-upload"
            >
              {fileList.length === 0 && (
                <button
                  style={{
                    // border: 0,
                    background: "none",
                  }}
                  type="button"
                  className="w-full flex flex-col items-center justify-center avatar-uploader "
                >
                  <LiaCloudUploadAltSolid
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
          <div className="text-center text-md md:text-xl pb-5">Logo</div>
        </Col>
      </Row>

      <Row {...rowLayout} className="">
        <Col {...colLayout}>
          <Form.Item name={"systemTitle"} label={"System Title"}>
            <Input
              type={"text"}
              placeholder={`Enter System Title`}
              className="border-2"
              size="large"
              allowClear
            />
          </Form.Item>
        </Col>
        <Col {...colLayout}>
          <Form.Item name={"Company Name"} label={"Company Name"}>
            <Input
              type={"text"}
              placeholder={`Enter Company Name`}
              className="border-2"
              size="large"
              allowClear
            />
          </Form.Item>
        </Col>
        <Col {...colLayout}>
          <Form.Item
            name={"vatRegistrationNumber"}
            label={"Vat Registation Number"}
          >
            <Input
              type={"text"}
              placeholder={`Enter Vat Registation Number`}
              className="border-2"
              size="large"
              allowClear
            />
          </Form.Item>
        </Col>
        <Col {...colLayout}>
          <Form.Item label={"Currency"}>
            <Input
              type={"text"}
              placeholder={`Enter Currency`}
              className="border-2"
              size="large"
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>

      <div className="w-full flex gap-3 justify-end items-center">
        <Button type="default">Cancel</Button>
        <Button
          htmlType="submit"
          className="bg-secondary hover:bg-posPurple text-white"
          // loading={isLoading}
        >
          Update
        </Button>
      </div>
    </CustomForm>
  );
};

export default GeneralSettingForm;
