import { Button, Form } from "antd";
import { useDispatch } from "react-redux";
import { GlobalUtilityStyle } from "../../../container/Styled";
import {
  closeCreateDrawer,
  closeEditDrawer,
} from "../../../redux/services/drawer/drawerSlice";

const SubmitButtonForm = ({ loading, children }) => {
  const dispatch = useDispatch();

  const handleDrawerClose = () => {
    dispatch(closeCreateDrawer());
    dispatch(closeEditDrawer());
  };

  return (
    <div className="w-full flex gap-3 justify-end items-center pb-20">
      <Button type="default" onClick={handleDrawerClose}>
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
  } = props;

  const [form] = Form.useForm();

  const onFinish = (values) => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => {
        handleSubmit(values);
      })
      .catch((error) => {
        console.error("Validation error:", error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
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
      >
        {children}

        {submitBtn && (
          <SubmitButtonForm loading={isLoading}>
            {submitBtnText}
          </SubmitButtonForm>
        )}
      </Form>
    </GlobalUtilityStyle>
  );
};

export default CustomForm;
