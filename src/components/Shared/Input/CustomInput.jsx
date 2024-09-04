import { Form, Input, InputNumber } from 'antd';

import { GlobalUtilityStyle } from '../../../container/Styled';

const { TextArea, Password } = Input;

const CustomInput = (props) => {
  const {
    type,
    name,
    label,
    placeholder,
    required = false,
    prefix,
    suffix,
    requireMsg = undefined,
    noStyle = false,
    addonAfter,
    tooltip,
    onChange,
    value,
    addonBefore = '+880',
    size = 'large',
    maxlength = 2,
    min,
    max,

    //for mb-0
    customStyle = false,
  } = props;

  const commonProps = {
    placeholder: `Enter ${placeholder ?? label}`,
    size,
    prefix,
    value,
  };

  const renderInputComponent = () => {
    switch (type) {
      case 'password':
        return <Password {...commonProps} className="mt-1 border-2" />;
      case 'textarea':
        return (
          <TextArea
            {...commonProps}
            className="mt-1 border-2"
            allowClear={true}
            autoSize={{ minRows: maxlength, maxRows: 30 }}
            showCount
          />
        );
      case 'number_with_percent':
        return (
          <InputNumber
            {...commonProps}
            type="number"
            className="mt-1 w-full border-2"
            min={0}
            max={100}
            controls={false}
            changeOnWheel={false}
            suffix={suffix ?? '%'}
          />
        );
      case 'number_with_money':
        return (
          <InputNumber
            {...commonProps}
            type="number"
            className="mt-1 w-full border-2"
            min={0}
            // controls={false}
            // controls={false}
            // changeOnWheel={false}
            suffix={suffix}
            // addonAfter={suffix}
          />
        );
      case 'phone':
        return (
          <InputNumber
            {...commonProps}
            type="number"
            className="ant-group-number mt-1 w-full border-2"
            placeholder="1XXXX123XX"
            addonBefore={addonBefore}
            controls={false}
            changeOnWheel={false}
            formatter={(value) => {
              if (value && value.startsWith('0')) {
                return `1${value.slice(1)}`;
              }
              return value;
            }}
          />
        );

      case 'staff':
        return (
          <InputNumber
            {...commonProps}
            type="number"
            className="ant-group-number mt-1 w-full border-2"
            placeholder="staff_id"
            max={9999}
            addonBefore={addonBefore}
            controls={false}
            changeOnWheel={false}
          />
        );
      case 'number':
        return (
          <InputNumber
            {...commonProps}
            // type="number"
            className="ant-group-addOn mt-1 w-full border-2"
            addonAfter={suffix}
            controls={false}
            changeOnWheel={false}
            onChange={onChange}
            min={min}
            max={max}
          />
        );
      default:
        return (
          <Input
            {...commonProps}
            type={type}
            allowClear={true}
            className="mt-1 border-2"
            suffix={suffix}
            addonAfter={addonAfter}
          />
        );
    }
  };

  return (
    <GlobalUtilityStyle>
      <Form.Item
        label={label}
        name={name}
        rules={[
          {
            required: required,
            message: `Please Input ${requireMsg ?? placeholder ?? label}!`,
          },
        ]}
        tooltip={tooltip}
        // noStyle={noStyle}
        noStyle={noStyle}
        className={customStyle && 'mb-0'}
      >
        {renderInputComponent()}
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default CustomInput;
