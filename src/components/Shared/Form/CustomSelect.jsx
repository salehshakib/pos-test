import { Controller } from "react-hook-form";
import { Form, Select } from "antd";

const CustomSelect = ({ label, name, placeholder, mode }) => {
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
            <Select
              {...field}
              mode={mode || undefined}
              placeholder={placeholder}
              className="mt-2"
              allowClear
              size="large"
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
            />
          </Form.Item>
        )}
      />
    </>
  );
};

export default CustomSelect;
