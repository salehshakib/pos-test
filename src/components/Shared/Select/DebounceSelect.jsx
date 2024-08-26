import { Form, Select, Spin } from 'antd';
import { GlobalUtilityStyle } from '../../../container/Styled';

const DebounceSelect = (props) => {
  const {
    name,
    label,
    placeholder,
    required = false,
    mode = 'single',
    options = [],
    isLoading = false,
    noStyle = false,
    onSearch,
    onSelect,
  } = props;

  return (
    <GlobalUtilityStyle>
      <Form.Item
        label={label && `${label}`}
        name={name}
        rules={[{ required: required, message: `Please input ${label}!` }]}
        noStyle={noStyle}
      >
        <Select
          showSearch
          placeholder={`Search ${placeholder ?? label}`}
          className="custom-selector mt-1"
          size="large"
          mode={mode}
          filterOption={false}
          onSearch={onSearch}
          options={options}
          notFoundContent={
            isLoading && (
              <Spin
                size="small"
                className="flex w-full items-center justify-center"
              />
            )
          }
          loading={isLoading}
          onSelect={onSelect}
          allowClear={true}
        />
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default DebounceSelect;
