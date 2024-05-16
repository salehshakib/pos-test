import { Col, Form, Row } from "antd";
import CustomCheckbox from "../Shared/Checkbox/CustomCheckbox";
import CustomForm from "../Shared/Form/CustomForm";
import {
  colLayout,
  fullColLayout,
  mdColLayout,
  rowLayout,
} from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import RichTextEditor from "../Shared/TextEditor/RichTextEditor";
import CustomUploader from "../Shared/Upload/CustomUploader";
import BarCodeComponent from "./BarCodeComponent";
import { BrandComponent } from "./BrandComponent";
import { CategoryComponent } from "./CategoryComponent";
import ProductCodeComponent from "./ProductCodeComponent";
import ProductTypeComponent from "./ProductTypeComponent";
import { TaxComponent } from "./TaxComponent";
import TaxTypeComponent from "./TaxTypeComponent";
import UnitComponent from "./UnitComponent";
import ComboProductsComponent from "./ComboProductsComponent";

const ProductCostComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch("product_type", form);

  if (productType === "standard")
    return (
      <Col {...colLayout}>
        <CustomInput
          label="Product Cost"
          type={"number"}
          required={true}
          name={"product_cost"}
        />
      </Col>
    );
};

const AttachmentComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch("product_type", form);

  if (productType === "digital")
    return (
      <Col {...fullColLayout}>
        <CustomUploader label={"Attachment"} name={"attachment"} />
      </Col>
    );
};

const AlertComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch("product_type", form);

  if (productType === "standard") {
    return (
      <Col {...colLayout}>
        <CustomInput
          label="Alert Quantity"
          type={"number"}
          // required={true}
          name={"alert_quantity"}
        />
      </Col>
    );
  }
};

const ProductForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <ProductTypeComponent />
        </Col>

        <Col {...colLayout}>
          <CustomInput
            label="Product Name"
            type={"text"}
            required={true}
            name={"name"}
          />
        </Col>

        <Col {...colLayout}>
          <ProductCodeComponent />
        </Col>

        <Col {...colLayout}>
          <BarCodeComponent />
        </Col>

        <ComboProductsComponent />
        <AttachmentComponent />
        <Col {...colLayout}>
          <BrandComponent />
        </Col>
        <Col {...colLayout}>
          <CategoryComponent />
        </Col>

        <UnitComponent />
        <ProductCostComponent />

        <Col {...colLayout}>
          <CustomInput
            label="Product Price"
            type={"number"}
            required={true}
            name={"product_price"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Daily Sale Objectives"
            type={"number"}
            tooltip="Minimum qty which must be sold in a day. If not you will not be notified on dashboard. But you have to set up cron job property for that. Follow the documentation in this regard."
            name={"daily_sale_objectitves"}
          />
        </Col>

        <AlertComponent />

        <Col {...colLayout}>
          <TaxComponent />
        </Col>
        <Col {...colLayout}>
          <TaxTypeComponent />
        </Col>
      </Row>

      <Row {...rowLayout}>
        <Col {...mdColLayout}>
          <CustomCheckbox
            label="Featured Product"
            // name="product_description"
            subLabel="(It will be displayed on POS)"
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomCheckbox
            label="Embeded Barcode"
            // name="product_description"
          />
        </Col>
      </Row>
      <Row {...rowLayout} justify={"center"} align={"middle"}>
        <Col xs={24}>
          <CustomUploader
            label={"Product Image"}
            // name={"brand_image"}
            // multiple={true}
          />
        </Col>
      </Row>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <RichTextEditor label="Product Details" name="details" />
        </Col>
      </Row>

      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomCheckbox
            // label="This Product has IME or Serial Number"
            mode="group"
            options={[
              "This Product has varient",
              "This product has different price for different warehouse",
              "This product has batch and expired date",
              "This product has IMEI or Serial numbers",
              "  Add Promotional Price",
              "Disable Woocommerce Sync",
            ]}
            name={"product_checkbox"}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default ProductForm;
