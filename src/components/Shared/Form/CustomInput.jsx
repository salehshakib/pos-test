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
                className="mt-2 hover:border-secondary border-2 focus:border-secondary"
              />
            )) ||
              (type === "textarea" && (
                <Input.TextArea
                  {...field}
                  size="large"
                  placeholder={placeholder}
                  className="mt-2 hover:border-secondary border-2 focus:border-secondary"
                />
              )) || (
                <Input
                  {...field}
                  type={type}
                  size="large"
                  color=""
                  placeholder={placeholder}
                  className="mt-2 hover:border-secondary border-2 focus:border-secondary"
                />
              )}
          </Form.Item>
        )}
      />
    </>
  );
};

export default CustomInput;
