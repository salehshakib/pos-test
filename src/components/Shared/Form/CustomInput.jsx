import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

const CustomInput = ({ type, name, label, placeholder }) => {
  return (
    <>
      <label htmlFor={name} className="font-bold text-black/70">
        {label}:
      </label>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            validateStatus={error ? "error" : ""}
            help={error ? error.message : null}
          >
            {(type === "password" && (
              <Input.Password
                {...field}
                size="large"
                placeholder={placeholder}
                className="mt-2"
              />
            )) ||
              (type === "textarea" && (
                <Input.TextArea
                  {...field}
                  size="large"
                  placeholder={placeholder}
                  className="mt-2"
                />
              )) || (
                <Input
                  {...field}
                  type={type}
                  size="large"
                  placeholder={placeholder}
                  className="mt-2"
                />
              )}
          </Form.Item>
        )}
      />
    </>
  );
};

export default CustomInput;
