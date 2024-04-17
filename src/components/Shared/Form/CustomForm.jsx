import { Form } from "antd";
import { FormProvider, useForm } from "react-hook-form";

const CustomForm = ({ onSubmit, children, resolver }) => {
  const formConfig = {};
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default CustomForm;
