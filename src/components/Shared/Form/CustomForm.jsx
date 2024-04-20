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

import { Form, message } from "antd";

const CustomForm = ({ onSubmit, children }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      onSubmit(values);
    } catch (error) {
      console.error("Validation error:", error);
      message.error("Please correct the errors in the form.");
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      {children}
    </Form>
  );
};

export default CustomForm;
