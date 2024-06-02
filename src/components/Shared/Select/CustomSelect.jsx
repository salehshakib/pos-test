import { Empty, Form, Select, Spin } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";

const CustomSelect = (props) => {
  const {
    name,
    label,
    placeholder,
    required = false,
    showSearch = false,
    mode = "single",
    options = [],
    isLoading,
    noStyle = false,
    styleProps,
    onChange,
  } = props;

  const filterOption = (input, option) =>
    (option?.label ?? "").toLocaleLowerCase().includes(input);

  const filterSort = (optionA, optionB) =>
    (optionA?.label ?? "")
      .toLowerCase()
      .localeCompare((optionB?.label ?? "").toLowerCase());

  return (
    <GlobalUtilityStyle>
      <Form.Item
        label={label && `Select ${label}`}
        name={name}
        rules={[{ required: required, message: `Please input ${label}!` }]}
        noStyle={noStyle}
      >
        {showSearch ? (
          <Select
            onChange={onChange}
            showSearch
            optionFilterProp="children"
            filterOption={filterOption}
            filterSort={filterSort}
            placeholder={`Select ${placeholder ?? label}`}
            className="mt-1 custom-selector"
            size="large"
            loading={isLoading}
            options={options}
            mode={mode}
            notFoundContent={
              isLoading ? (
                <Spin
                  size="small"
                  className="w-full flex justify-center items-center"
                />
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )
            }
            style={{
              ...styleProps,
            }}
            allowClear={true}
            defaultActiveFirstOption
          />
        ) : (
          <Select
            onChange={onChange}
            placeholder={`Select ${placeholder ?? label}`}
            className="mt-1 custom-selector"
            size="large"
            loading={isLoading}
            options={options}
            mode={mode}
            notFoundContent={
              isLoading ? (
                <Spin
                  size="small"
                  className="w-full flex justify-center items-center"
                />
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )
            }
            style={{
              ...styleProps,
            }}
            allowClear={true}
          />
        )}
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default CustomSelect;
