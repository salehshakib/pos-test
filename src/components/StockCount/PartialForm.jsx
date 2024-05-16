import { Form } from "antd";
import { BrandComponent } from "./BrandComponent";
import { CategoryComponent } from "./CategoryComponent";

const PartialForm = () => {
  const form = Form.useFormInstance();
  const typeData = Form.useWatch("type", form);

  if (typeData === "Partial") {
    return (
      <>
        <CategoryComponent />
        <BrandComponent />
      </>
    );
  }
};

export default PartialForm;
