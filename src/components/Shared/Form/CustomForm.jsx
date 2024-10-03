import { Button, Form } from 'antd';
import { useDispatch } from 'react-redux';

import { GlobalUtilityStyle } from '../../../container/Styled';
import {
  closeCreateDrawer,
  closeEditDrawer,
} from '../../../redux/services/drawer/drawerSlice';
import { sanitizeObj } from '../../../utilities/lib/sanitizeObj';

const FormButton = ({ loading, children, onClose, btnStyle }) => {
  const dispatch = useDispatch();
  const form = Form.useFormInstance();

  const handleDrawerClose = () => {
    form.resetFields();
    dispatch(closeCreateDrawer());
    dispatch(closeEditDrawer());
  };

  // console.log(first)

  return (
    <div
      className={`flex w-full items-center justify-end gap-3 pt-5 ${btnStyle ? 'pb-20' : 'pb-2'}`}
    >
      <Button type="default" onClick={onClose ?? handleDrawerClose}>
        Cancel
      </Button>
      <Button htmlType="submit" type="primary" loading={loading}>
        {children}
      </Button>
    </div>
  );
};

const CustomForm = (props) => {
  const {
    handleSubmit,
    children,
    fields,
    isLoading,
    submitBtn = true,
    submitBtnText = 'Save',
    onClose,
    form,
    onChange,
    layout = 'vertical',
    btnStyle = true,
  } = props;

  const onFinish = (values) => {
    handleSubmit(sanitizeObj(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.error(errorInfo);
  };

  return (
    <GlobalUtilityStyle>
      <Form
        form={form}
        fields={fields}
        onFinish={onFinish}
        layout={layout}
        autoComplete="on"
        onFinishFailed={onFinishFailed}
        onChange={onChange}
        scrollToFirstError={true}
      >
        {children}

        {submitBtn && (
          <FormButton loading={isLoading} onClose={onClose} btnStyle={btnStyle}>
            {submitBtnText}
          </FormButton>
        )}
      </Form>
    </GlobalUtilityStyle>
  );
};

export default CustomForm;
