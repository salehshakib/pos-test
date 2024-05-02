import { Button, Form } from "antd";
import { useDispatch } from "react-redux";
import {
  closeCreateDrawer,
  closeEditDrawer,
} from "../../../redux/services/drawer/drawerSlice";
import { GlobalUtilityStyle } from "../../../container/Styled";

const CustomForm = ({
  handleSubmit,
  children,
  fields,
  isLoading,
  submitBtn = true,
  submitBtnText = "Save",
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

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

  const handleDrawerClose = () => {
    dispatch(closeCreateDrawer());
    dispatch(closeEditDrawer());
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
          <div className="w-full flex gap-3 justify-end items-center">
            <Button type="default" onClick={handleDrawerClose}>
              Cancel
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              // className=" text-white"
              loading={isLoading}
            >
              {submitBtnText}
            </Button>
          </div>
        )}
      </Form>
    </GlobalUtilityStyle>
  );
};

export default CustomForm;
