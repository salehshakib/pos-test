import { Button, Form, Select, Space, Spin } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";

export const CustomSelectButton = (props) => {
  const {
    name,
    label,
    placeholder,
    required = false,
    requireMsg = undefined,
    onClick,
    showSearch,
    icon,
    mode = "single",
    options = [],
    isLoading,
    styleProps,
  } = props;

  return (
    <GlobalUtilityStyle>
      <Form.Item label={label} required={required}>
        <Space.Compact style={{ width: "100%" }}>
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
                mode={mode}
                notFoundContent={
                  isLoading && (
                    <Spin
                      size="small"
                      className="w-full flex justify-center items-center"
                    />
                  )
                }
                allowClear={true}
              />
            ) : (
              <Select
                placeholder={`Select ${placeholder ?? label}`}
                className="mt-2 custom-selector"
                size="large"
                loading={isLoading}
                options={options}
                mode={mode}
                style={{ ...styleProps }}
                notFoundContent={
                  isLoading && (
                    <Spin
                      size="small"
                      className="w-full flex justify-center items-center"
                    />
                  )
                }
                allowClear={true}
              />
            )}
          </Form.Item>
          <Button
            onClick={onClick}
            icon={icon}
            className="border-2 mt-2"
            size="large"
          />
        </Space.Compact>
      </Form.Item>
    </GlobalUtilityStyle>
  );
};
