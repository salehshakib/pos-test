// import { Form } from "antd";
// import { FormProvider, useForm } from "react-hook-form";

// const CustomForm = ({ onSubmit, children, resolver }) => {
//   const formConfig = {};
//   if (resolver) {
//     formConfig["resolver"] = resolver;
//   }
//   const methods = useForm(formConfig);
//   return (
//     <FormProvider {...methods}>
//       <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
//         {children}
//       </Form>
//     </FormProvider>
//   );
// };

// export default CustomForm;

import { Form } from "antd";

const CustomForm = ({ onSubmit, children }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      // const values = form.getFieldsValue();
      onSubmit(values);
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      autoComplete="on"
      onFinishFailed={onFinishFailed}
    >
      {children}
    </Form>
  );
};

export default CustomForm;
