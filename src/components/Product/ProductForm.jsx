import { Col, Form, Row } from "antd";
import CustomCheckbox from "../Shared/Checkbox/CustomCheckbox";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomForm from "../Shared/Form/CustomForm";
import { colLayout, fullColLayout, rowLayout } from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import RichTextEditor from "../Shared/TextEditor/RichTextEditor";
import CustomUploader from "../Shared/Upload/CustomUploader";
import BarCodeComponent from "./BarCodeComponent";
import { BrandComponent } from "./BrandComponent";
import { CategoryComponent } from "./CategoryComponent";
import ComboProductsComponent from "./ComboProductsComponent";
import ProductCodeComponent from "./ProductCodeComponent";
import ProductTypeComponent from "./ProductTypeComponent";
import { SearchWarehouse } from "./SearchWarehouse";
import { TaxComponent } from "./TaxComponent";
import TaxTypeComponent from "./TaxTypeComponent";
import UnitComponent from "./UnitComponent";
import { VarientComponent } from "./VarientComponent";
import WarehouseTableComponent from "./WarehouseTableComponent";

const ProductCostComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch("type", form);

  if (productType === "standard")
    return (
      <Col {...colLayout}>
        <CustomInput
          label="Product Buying Cost"
          type={"number"}
          required={true}
          name={"buying_price"}
        />
      </Col>
    );
};

const AttachmentComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch("type", form);

  if (productType === "digital")
    return (
      <Col {...fullColLayout}>
        <CustomUploader label={"Attachment"} name={"attach_file"} />
      </Col>
    );
};

const AlertComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch("type", form);

  if (productType === "standard") {
    return (
      <Col {...colLayout}>
        <CustomInput
          label="Alert Quantity"
          type={"number"}
          // required={true}
          name={"alert_qty"}
        />
      </Col>
    );
  }
};

const InitialStockComponent = () => {
  const form = Form.useFormInstance();
  const initialSctock = Form.useWatch("initial_stock", form);

  return (
    <>
      <Col {...fullColLayout}>
        <CustomCheckbox label="Initial Stock" name="initial_stock" />
      </Col>

      {initialSctock && (
        <>
          <Col {...fullColLayout} className="mt-5">
            <SearchWarehouse />
          </Col>

          <Col {...fullColLayout}>
            <WarehouseTableComponent className="mb-10" />
          </Col>
        </>
      )}
    </>
  );
};

const DifferentPriceComponent = () => {
  const form = Form.useFormInstance();
  const has_different_price = Form.useWatch("has_differnet_price", form);

  return (
    <Row {...rowLayout}>
      <Col {...fullColLayout}>
        <CustomCheckbox
          label="This product has different price for different warehouse"
          name="has_differnet_price"
        />
      </Col>

      {has_different_price && (
        <>
          <Col {...fullColLayout} className="mt-5">
            <SearchWarehouse />
          </Col>

          <Col {...fullColLayout}>
            <WarehouseTableComponent className="mb-10" />
          </Col>
        </>
      )}
    </Row>
  );
};

const ExpireComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch("type", form);
  const hasExpiredDate = Form.useWatch("has_expired_date", form);

  if (productType === "standard") {
    return (
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomCheckbox
            label="This product has batch and expired date"
            name="has_expired_date"
          />
        </Col>

        {hasExpiredDate && (
          <Col {...colLayout}>
            <CustomDatepicker label={"Expired Date"} name={"expired_date"} />
          </Col>
        )}
      </Row>
    );
  }
};

const PromotionalPriceComponent = () => {
  const form = Form.useFormInstance();
  const hasPromotionalPrice = Form.useWatch("has_promotion", form);

  return (
    <Row {...rowLayout}>
      <Col {...fullColLayout}>
        <CustomCheckbox label="Add Promotional Price" name="has_promotion" />
      </Col>

      {hasPromotionalPrice && (
        <>
          <Col {...colLayout}>
            <CustomInput
              label="Promotional Price"
              type={"number"}
              required={true}
            />
          </Col>
          <Col {...colLayout}>
            <CustomDatepicker
              type={"date"}
              label={"Start Date"}
              name={"start_date"}
            />
          </Col>
          <Col {...colLayout}>
            <CustomDatepicker
              type={"date"}
              label={"End Date"}
              name={"end_date"}
            />
          </Col>
        </>
      )}
    </Row>
  );
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
            label="Product Selling Price"
            type={"number"}
            required={true}
            name={"selling_price"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Daily Sale Objectives"
            type={"number"}
            tooltip="Minimum qty which must be sold in a day. If not you will not be notified on dashboard. But you have to set up cron job property for that. Follow the documentation in this regard."
            name={"daily_sale_qty"}
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
        <InitialStockComponent />

        <Col {...fullColLayout}>
          <CustomCheckbox
            label="Featured Product"
            name="has_featured"
            subLabel="(It will be displayed on POS)"
          />
        </Col>
        <Col {...fullColLayout}>
          <CustomCheckbox label="Embeded Barcode" name="embedded_barcode" />
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

      <VarientComponent />
      <DifferentPriceComponent />
      <ExpireComponent />

      <PromotionalPriceComponent />

      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomCheckbox
            label="Disable Ecommerce Sync"
            name="ecommerce_sync"
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default ProductForm;
