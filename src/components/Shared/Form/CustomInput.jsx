// import { Form, Input } from "antd";
// import { Controller } from "react-hook-form";

// const CustomInput = ({ type, name, label, placeholder }) => {
//   return (
//     <>
//       <label htmlFor={name} className="font-bold text-black/70">
//         {label}:
//       </label>
//       <Controller
//         name={name}
//         render={({ field, fieldState: { error } }) => (
//           <Form.Item
//             validateStatus={error ? "error" : ""}
//             help={error ? error.message : null}
//           >
//             {(type === "password" && (
//               <Input.Password
//                 {...field}
//                 size="large"
//                 placeholder={placeholder}
//                 className="mt-2 border-2"
//                 allowClear
//               />
//             )) ||
//               (type === "textarea" && (
//                 <Input.TextArea
//                   {...field}
//                   size="large"
//                   placeholder={placeholder}
//                   className="mt-2 border-2"
//                   allowClear
//                 />
//               )) || (
//                 <Input
//                   {...field}
//                   type={type}
//                   size="large"
//                   placeholder={placeholder}
//                   className="mt-2 border-2"
//                   allowClear
//                 />
//               )}
//           </Form.Item>
//         )}
//       />
//     </>
//   );
// };

// export default CustomInput;

import { Form, Input } from "antd";

const CustomInput = ({ type, name, label, placeholder, required = false }) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: required, message: `Please input your ${name}!` }]}
    >
      {(type === "password" && (
        <Input.Password
          placeholder={placeholder}
          className="mt-2 border-2"
          size="large"
          allowClear
        />
      )) ||
        (type === "textarea" && (
          <Input.TextArea
            placeholder={placeholder}
            className="mt-2 border-2"
            size="large"
            allowClear
          />
        )) || (
          <Input
            type={type}
            placeholder={placeholder}
            className="mt-2 border-2"
            size="large"
            allowClear
          />
        )}
    </Form.Item>
  );
};

export default CustomInput;
