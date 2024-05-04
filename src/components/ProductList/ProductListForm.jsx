import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import RichTextEditor from "../Shared/TextEditor/RichTextEditor";

const rowLayout = {
  gutter: 25,
  // align: "middle",
  // justify: "start",
};

const colLayout = {
  xs: 24,
  md: 12,
  lg: 8,
};

const richTextLayout = {
  xs: 24,
};

const ProductListForm = ({ handleSubmit, isLoading, fields }) => {
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      fields={fields}
      isLoading={isLoading}
    >
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomInput
            label="Product Name"
            type={"text"}
            // required={true}
            name={"product_name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Product Code"
            type={"text"}
            // required={true}
            name={"product_code"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Product Type"
            type={"text"}
            // required={true}
            name={"product_type"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Barcode Symbology"
            type={"text"}
            // required={true}
            // name={"product_code"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Product Brand"
            type={"text"}
            // required={true}
            // name={"product_code"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Product Category"
            type={"text"}
            // required={true}
            // name={"product_code"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Product Unit"
            type={"text"}
            // required={true}
            // name={"product_code"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Sale Unit"
            type={"text"}
            // required={true}
            // name={"product_code"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Pruchase Unit"
            type={"text"}
            // required={true}
            // name={"product_code"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Product Cost"
            type={"text"}
            // required={true}
            // name={"product_code"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Product Price"
            type={"text"}
            // required={true}
            // name={"product_code"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Daily Sale Objectives"
            type={"text"}
            // required={true}
            // name={"product_code"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Product Quantity"
            type={"text"}
            // required={true}
            // name={"product_code"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Alert Quantity"
            type={"text"}
            // required={true}
            // name={"product_code"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Product Tax"
            type={"text"}
            // required={true}
            // name={"product_code"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Tax Method"
            type={"text"}
            // required={true}
            // name={"product_code"}
          />
        </Col>
      </Row>
      <Row {...rowLayout}>
        <Col {...richTextLayout}>
          <RichTextEditor label="Product Details" name="product_description" />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default ProductListForm;
