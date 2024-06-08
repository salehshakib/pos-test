import { Col, Row } from "antd";
import { fullColLayout, mdColLayout, rowLayout } from "../../layout/FormLayout";
import { useGetAllTaxQuery } from "../../redux/services/tax/taxApi";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomUploader from "../Shared/Upload/CustomUploader";
import { ReturnProductTable } from "./overview/ReturnProductTable";

const TaxComponent = () => {
  const { data, isFetching } = useGetAllTaxQuery({});

  const options = data?.results?.tax?.map((item) => {
    return {
      value: item.rate,
      label: item.name,
      tax_rate: item?.rate,
    };
  });

  return (
    <CustomSelect
      label="Order Tax"
      options={options}
      name={"tax_rate"}
      isLoading={isFetching}
    />
  );
};

const SaleReturnForm = ({ formValues, setFormValues, ...props }) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomInput
            label="Sale Reference"
            name={"purchase_reference"}
            // placeholder={"Purchase Refernce"}
            required={true}
          />
        </Col>

        <ReturnProductTable
          formValues={formValues}
          setFormValues={setFormValues}
        />

        <Col {...mdColLayout}>
          <TaxComponent />
        </Col>

        <Col {...fullColLayout}>
          <CustomUploader label={"Attach Document"} name={"logo"} />
        </Col>

        <Col {...mdColLayout}>
          <CustomInput type={"textarea"} name="sale_note" label="Sale Note" />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput type={"textarea"} name="staff_note" label="Staff Note" />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default SaleReturnForm;
