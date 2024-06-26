import { Col, Form } from "antd";
import { mdColLayout } from "../../layout/FormLayout";
import { CategoryComponent } from "../ReusableComponent/CategoryComponent";
import { BrandComponent } from "../ReusableComponent/BrandComponent";

const PartialForm = () => {
  const form = Form.useFormInstance();
  const typeData = Form.useWatch("type", form);

  if (typeData === "Partial") {
    return (
      <>
        <Col {...mdColLayout}>
          <CategoryComponent mode="multiple" name={"stock_category_ids"} />
        </Col>
        <Col {...mdColLayout}>
          <BrandComponent name="stock_brand_ids" mode="multiple" />
        </Col>
      </>
    );
  }
};

export default PartialForm;
