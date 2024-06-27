import { Form } from "antd";
import { useEffect } from "react";

const useInitialFormField = (name, options) => {
  const form = Form.useFormInstance();

  useEffect(() => {
    if (options.length && !form.getFieldValue(name)) {
      form.setFieldValue(name, options[0].value);
    }
  }, [form, name, options]);
};

export default useInitialFormField;
