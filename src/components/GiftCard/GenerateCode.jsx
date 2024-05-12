import { Button, Col, Form, Input, Row } from "antd";
import { GlobalUtilityStyle } from "../../container/Styled";

const rowLayout = {
  gutter: 8,
  align: "middle",
};

const generateRandomCode = () => {
  const currentTime = new Date().getTime();
  const seed = currentTime % 2147483647;
  let random = seed;
  let code = "";
  for (let i = 0; i < 16; i++) {
    random = (random * 16807) % 2147483647;
    code += (random % 10).toString();
  }
  return code;
};

const GenerateCode = () => {
  const form = Form.useFormInstance();

  const handleGenerateCode = () => {
    const randomCode = generateRandomCode();

    form?.setFieldValue("code", randomCode);
  };

  const onCodeChange = (e) => {
    form.setFieldValue("code", e.target.value);
  };

  return (
    <GlobalUtilityStyle>
      <Form.Item
        label="Generate Code"
        extra={
          <span className="pl-1">Click button to generate a unique code</span>
        }
      >
        <Row {...rowLayout}>
          <Col span={18}>
            <Form.Item
              name="code"
              className="mb-5"
              rules={[
                {
                  validator: (_, value) => {
                    if (/^\d+$/.test(value)) {
                      // Use regex to check if value consists of digits only
                      return Promise.resolve(); // Resolve if the value contains only digits
                    } else {
                      return Promise.reject(
                        new Error("Only numbers are allowed for this field")
                      ); // Reject if the value contains non-numeric characters
                    }
                  },
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter Code"
                className="border-2"
                onChange={onCodeChange}
                size="large"
                allowClear
              />
              {/* <Input.OTP /> */}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Button size="large" className="mb-5" onClick={handleGenerateCode}>
              Generate Code
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default GenerateCode;
