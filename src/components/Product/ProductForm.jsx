import { Col, Form, Row } from "antd";
import {
  colLayout,
  fullColLayout,
  mdColLayout,
  rowLayout,
} from "../../layout/FormLayout";
import CustomCheckbox from "../Shared/Checkbox/CustomCheckbox";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import RichTextEditor from "../Shared/TextEditor/RichTextEditor";
import CustomUploader from "../Shared/Upload/CustomUploader";
import BarCodeComponent from "./overview/BarCodeComponent";
import { BrandComponent } from "./overview/BrandComponent";
import { CategoryComponent } from "./overview/CategoryComponent";
import ComboProductsComponent from "./overview/ComboProductsComponent";
import ProductCodeComponent from "./overview/ProductCodeComponent";
import ProductTypeComponent from "./overview/ProductTypeComponent";
import { SearchWarehouse } from "./overview/SearchWarehouse";
import { TaxComponent } from "./overview/TaxComponent";
import TaxTypeComponent from "./overview/TaxTypeComponent";
import UnitComponent from "./overview/UnitComponent";
import { VarientComponent } from "./overview/VarientComponent";
import { WarehouseStockTableComponent } from "./overview/WarehouseStockTableComponent";
import WarehouseTableComponent from "./overview/WarehouseTableComponent";
import dayjs from "dayjs";

const ProductCostComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch("type", form);

  if (productType === "Standard")
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

  if (productType === "Digital")
    return (
      <Col {...fullColLayout}>
        <CustomUploader
          label={"Attachment"}
          name={"attach_file"}
          required={true}
        />
      </Col>
    );
};

const AlertComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch("type", form);

  if (productType === "Standard") {
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
  const hasStock = Form.useWatch("has_stock", form);

  return (
    <>
      <Col {...fullColLayout}>
        <CustomCheckbox
          label="Initial Stock"
          name="has_stock"
          // required={true}
        />
      </Col>

      {hasStock && (
        <>
          <Col {...fullColLayout} className="mt-5">
            <SearchWarehouse name="initial_stock_warehouse_id" />
          </Col>

          <Col {...fullColLayout}>
            <WarehouseStockTableComponent className="mb-10" />
          </Col>
        </>
      )}
    </>
  );
};

const DifferentPriceComponent = () => {
  const form = Form.useFormInstance();
  const hasDifferentPrice = Form.useWatch("has_different_price", form);

  return (
    <Row {...rowLayout}>
      <Col {...fullColLayout}>
        <CustomCheckbox
          label="This product has different price for different warehouse"
          name="has_different_price"
        />
      </Col>

      {hasDifferentPrice && (
        <>
          <Col {...fullColLayout} className="mt-5">
            <SearchWarehouse name={"warehouse_id"} />
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

  if (productType === "Standard") {
    return (
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomCheckbox
            label="This product has batch and expired date"
            name="has_expired_date"
          />
        </Col>

        {hasExpiredDate && (
          <Col {...mdColLayout}>
            <CustomDatepicker
              label={"Expired Date"}
              name={["product_expire", "expired_date"]}
              required={true}
            />
          </Col>
        )}
      </Row>
    );
  }
};

const PromotionalPriceComponent = () => {
  const form = Form.useFormInstance();
  const hasPromotionalPrice = Form.useWatch("has_promotion", form);

  const disabledDate = (current) => {
    return current < dayjs().startOf("day");
  };

  const start_date = Form.useWatch(["promotion", "starting_date"], form);

  const disabledDateStart = (current) => {
    if (start_date) {
      return (
        current && start_date && current < dayjs(start_date).startOf("day")
      );
    } else {
      return current < dayjs().startOf("day");
    }
  };

  console.log();

  return (
    <Row {...rowLayout}>
      <Col {...fullColLayout}>
        <CustomCheckbox label="Add Promotional Price" name="has_promotion" />
      </Col>

      {hasPromotionalPrice && (
        <>
          <Col {...mdColLayout}>
            <CustomInput
              label="Promotional Price"
              name={["promotion", "promotion_price"]}
              type={"number"}
              required={true}
            />
          </Col>
          <Row {...rowLayout}>
            <Col {...mdColLayout}>
              <CustomDatepicker
                type={"date"}
                label={"Start Date"}
                name={["promotion", "starting_date"]}
                required={true}
                disabledDate={disabledDate}
              />
            </Col>
            <Col {...mdColLayout}>
              <CustomDatepicker
                type={"date"}
                label={"End Date"}
                name={["promotion", "last_date"]}
                required={true}
                disabledDate={disabledDateStart}
              />
            </Col>
          </Row>
        </>
      )}
    </Row>
  );
};

const ProductForm = ({ options, ...props }) => {
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

        <ComboProductsComponent options={options} />
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
            label={"Attachment"}
            name={"attachments"}
            multiple={true}
            required={true}
          />
        </Col>
      </Row>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <RichTextEditor
            label="Product Details"
            name="details"
            required={true}
          />
        </Col>
      </Row>

      <VarientComponent />
      <DifferentPriceComponent />
      <ExpireComponent />

      <PromotionalPriceComponent />

      {/* <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomCheckbox
            label="Disable Ecommerce Sync"
            name="ecommerce_sync"
          />
        </Col>
      </Row> */}
    </CustomForm>
  );
};

export default ProductForm;
