import { Form, Select } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";

const CustomSelect = ({
  name,
  label,
  placeholder,
  required = false,
  showSearch = false,
  options = [],
  isLoading,
}) => {
  return (
    <GlobalUtilityStyle>
      <Form.Item
        label={`Select ${label}`}
        name={name}
        rules={[{ required: required, message: `Please input ${label}!` }]}
      >
        {showSearch ? (
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            placeholder={`Select ${placeholder ?? label}`}
            className="mt-2 custom-selector"
            size="large"
            loading={isLoading}
            options={options}
            allowClear
          />
        ) : (
          <Select
            placeholder={`Select ${placeholder ?? label}`}
            className="mt-2 custom-selector"
            size="large"
            loading={isLoading}
            options={options}
            allowClear
          />
        )}
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default CustomSelect;
