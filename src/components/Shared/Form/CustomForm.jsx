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
import { useForm } from "antd/es/form/Form";

const CustomForm = ({ onSubmit, children }) => {
  const [form] = useForm();

  const onFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      {children}
    </Form>
  );
};

export default CustomForm;
