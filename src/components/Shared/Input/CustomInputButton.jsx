import { Button, Form, Input, Space } from 'antd';

import { GlobalUtilityStyle } from '../../../container/Styled';

const CustomInputButton = (props) => {
  const {
    type,
    name,
    label,
    placeholder,
    required = false,
    requireMsg = undefined,
    onClick,
    icon,
    btnText,
  } = props;

  return (
    <GlobalUtilityStyle>
      <Form.Item label={label} required={required}>
        <Space.Compact style={{ width: '100%' }}>
          <Form.Item
            name={name}
            rules={[
              {
                required: required,
                message: `Please input ${requireMsg ?? label}!`,
              },
            ]}
            noStyle
          >
            <Input
              type={type}
              placeholder={`${placeholder ?? 'Enter' + label}`}
              className="mt-1 border-2"
              size="large"
              style={{
                allowClear: true,
              }}
              autoComplete="off"
            />
          </Form.Item>
          <Button
            onClick={onClick}
            icon={icon}
            className="mt-1 flex items-center justify-center border-2"
            size="large"
          >
            {btnText}
          </Button>
        </Space.Compact>
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default CustomInputButton;
