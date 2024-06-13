// import { Form, Input, InputNumber } from "antd";
// import { GlobalUtilityStyle } from "../../../container/Styled";
// const { TextArea, Password } = Input;

// const CustomInput = (props) => {
//   const {
//     type,
//     name,
//     label,
//     placeholder,
//     required = false,
//     prefix,
//     suffix,
//     requireMsg = undefined,
//     noStyle = false,
//     addonAfter,
//     tooltip,
//     onChange,
//     value,
//   } = props;

//   return (
//     <GlobalUtilityStyle>
//       <Form.Item
//         label={label}
//         name={name}
//         rules={[
//           {
//             required: required,
//             message: `Please Input ${requireMsg ?? label}!`,
//           },
//         ]}
//         tooltip={tooltip}
//         noStyle={noStyle}
//       >
//         {type === "password" ? (
//           <Password
//             placeholder={`Enter ${placeholder ?? label}`}
//             className="mt-1 border-2 "
//             size="large"
//             prefix={prefix}
//             allowClear={true}
//           />
//         ) : type === "select" ? (
//           <h1>Use Custom select component</h1>
//         ) : type === "textarea" ? (
//           <TextArea
//             placeholder={`Enter ${placeholder ?? label}`}
//             className="mt-1 border-2"
//             size="large"
//             autoSize={{
//               minRows: 2,
//               maxRows: 5,
//             }}
//             showCount
//             allowClear={true}
//           />
//         ) : type === "number_with_percent" ? (
//           <InputNumber
//             type="number"
//             placeholder={`Enter ${placeholder ?? label}`}
//             className="mt-1 border-2 w-full"
//             size="large"
//             prefix={prefix}
//             suffix={"%"}
//             min={0}
//             max={100}
//             // formatter={(value) => `${value}%`}
//             // parser={(value) => value?.replace("%", "")}
//           />
//         ) : type === "phone" ? (
//           <InputNumber
//             type="number"
//             placeholder="01XXXX123XX"
//             className="mt-1 border-2 w-full ant-group-number"
//             prefix={prefix}
//             addonBefore={"+88"}
//             suffix={suffix}
//             size="large"
//             controls={false}
//             changeOnWheel={false}
//           />
//         ) : type === "number" ? (
//           <InputNumber
//             type="number"
//             placeholder={`Enter ${placeholder ?? label}`}
//             className="mt-1 border-2 w-full ant-group-addOn"
//             size="large"
//             prefix={prefix}
//             // suffix={suffix}
//             addonAfter={suffix}
//             controls={false}
//             changeOnWheel={false}
//             onChange={onChange}
//           />
//         ) : (
//           <Input
//             type={type}
//             placeholder={`Enter ${placeholder ?? label}`}
//             className="mt-1 border-2"
//             size="large"
//             prefix={prefix}
//             suffix={suffix}
//             addonAfter={addonAfter}
//             allowClear={true}
//             value={value}
//           />
//         )}
//       </Form.Item>
//     </GlobalUtilityStyle>
//   );
// };

// export default CustomInput;

import { Form, Input, InputNumber } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";
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
    requireMsg,
    noStyle = false,
    addonAfter,
    tooltip,
    onChange,
    value,
  } = props;

  const commonProps = {
    placeholder: `Enter ${placeholder ?? label}`,
    className: "mt-1 border-2",
    size: "large",
    prefix,
    suffix,
    allowClear: true,
    value,
  };

  const renderInputComponent = () => {
    switch (type) {
      case "password":
        return <Password {...commonProps} />;
      case "textarea":
        return (
          <TextArea
            {...commonProps}
            autoSize={{ minRows: 2, maxRows: 5 }}
            showCount
          />
        );
      case "number_with_percent":
        return (
          <InputNumber
            {...commonProps}
            type="number"
            className="w-full"
            min={0}
            max={100}
            suffix="%"
          />
        );
      case "phone":
        return (
          <InputNumber
            {...commonProps}
            type="number"
            className="w-full ant-group-number"
            placeholder="01XXXX123XX"
            addonBefore="+88"
            controls={false}
            changeOnWheel={false}
          />
        );
      case "number":
        return (
          <InputNumber
            {...commonProps}
            type="number"
            className="w-full ant-group-addOn"
            addonAfter={suffix}
            controls={false}
            changeOnWheel={false}
            onChange={onChange}
          />
        );
      case "select":
        return <h1>Use Custom select component</h1>;
      default:
        return <Input {...commonProps} type={type} addonAfter={addonAfter} />;
    }
  };

  return (
    <GlobalUtilityStyle>
      <Form.Item
        label={label}
        name={name}
        rules={[
          {
            required,
            message: `Please Input ${requireMsg ?? label}!`,
          },
        ]}
        tooltip={tooltip}
        noStyle={noStyle}
      >
        {renderInputComponent()}
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default CustomInput;
