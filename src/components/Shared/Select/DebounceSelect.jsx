import { Form, Select, Spin } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";

const DebouceSelect = (props) => {
  const {
    name,
    label,
    placeholder,
    required = false,
    mode = "single",
    options = [],
    isLoading = false,
    noStyle = false,
    onSearch,
    onSelect,
  } = props;

  return (
    <GlobalUtilityStyle>
      <Form.Item
        label={label && `Select ${label}`}
        name={name}
        rules={[{ required: required, message: `Please input ${label}!` }]}
        noStyle={noStyle}
      >
        <Select
          placeholder={`Type ${placeholder ?? label}`}
          className="mt-2 custom-selector"
          size="large"
          mode={mode}
          filterOption={false}
          onSearch={onSearch}
          options={options}
          notFoundContent={
            isLoading && (
              <Spin
                size="small"
                className="w-full flex justify-center items-center"
              />
            )
          }
          onSelect={onSelect}
          allowClear
        />
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default DebouceSelect;
