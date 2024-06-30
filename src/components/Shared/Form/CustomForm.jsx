import { Button, Form } from "antd";
import { useDispatch } from "react-redux";
import { GlobalUtilityStyle } from "../../../container/Styled";
import {
  closeCreateDrawer,
  closeEditDrawer,
} from "../../../redux/services/drawer/drawerSlice";

const FormButton = ({ loading, children, onClose }) => {
  const dispatch = useDispatch();
  const form = Form.useFormInstance();

  const handleDrawerClose = () => {
    form.resetFields();
    dispatch(closeCreateDrawer());
    dispatch(closeEditDrawer());
  };

  return (
    <div className={`w-full flex gap-3 justify-end items-center pb-20 pt-5`}>
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
    submitBtnText = "Save",
    onClose,
    form,
    onChange,
  } = props;

  const onFinish = (values) => {
    handleSubmit(values);
    // form
    //   .validateFields({
    //     validateOnly: true,
    //   })
    //   .then(() => {
    //     //
    //   })

    //   .catch((error) => {
    //     console.error("Validation error:", error);
    //   });
  };

  const onFinishFailed = (errorInfo) => {
    //console.log(errorInfo);
  };

  return (
    <GlobalUtilityStyle>
      <Form
        form={form}
        fields={fields}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="on"
        onFinishFailed={onFinishFailed}
        onChange={onChange}
        scrollToFirstError
      >
        {children}

        {submitBtn && (
          <FormButton loading={isLoading} onClose={onClose}>
            {submitBtnText}
          </FormButton>
        )}
      </Form>
    </GlobalUtilityStyle>
  );
};

export default CustomForm;
