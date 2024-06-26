import { Col, Row } from "antd";
import { fullColLayout, rowLayout } from "../../layout/FormLayout";
import { WarehouseComponent } from "../ReusableComponent/WarehouseComponent";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomUploader from "../Shared/Upload/CustomUploader";
import { AdjustmentProductTable } from "./overview/AdjustmentProductTable";

const AdjustmentForm = ({
  formValues,
  setFormValues,
  products,
  setProducts,
  ...props
}) => {
  //console.log(formValues);
  //console.log(products);
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <WarehouseComponent />
        </Col>

        <AdjustmentProductTable
          formValues={formValues}
          setFormValues={setFormValues}
          products={products}
          setProducts={setProducts}
        />

        <Col {...fullColLayout}>
          <CustomUploader label="Attach Documents" name={"attachment"} />
        </Col>
        <Col {...fullColLayout}>
          <CustomInput
            label="Sale Note"
            multiple={true}
            type={"textarea"}
            name={"note"}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default AdjustmentForm;
