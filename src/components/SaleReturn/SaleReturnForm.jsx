import { Col, Form, message, Row } from "antd";
import { fullColLayout, mdColLayout, rowLayout } from "../../layout/FormLayout";
import { useGetAllTaxQuery } from "../../redux/services/tax/taxApi";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomUploader from "../Shared/Upload/CustomUploader";
import { ReturnProductTable } from "./overview/ReturnProductTable";
import { useCheckReferenceMutation } from "../../redux/services/return/saleReturnApi";
import { useState } from "react";

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

const ReturnComponent = ({ formValues, setFormValues, reference_id }) => {
  return (
    <>
      <div className=" text-lg font-semibold text-center w-full underline ">
        Reference ID: {reference_id}
      </div>
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
    </>
  );
};

const SaleReturnForm = ({ formValues, setFormValues, ...props }) => {
  const [referenceForm] = Form.useForm();

  const [checkReference, { isLoading }] = useCheckReferenceMutation();

  const [saleExists, setSaleExists] = useState(false);
  const [refId, setRefId] = useState(null);

  const handleSubmit = async (values) => {
    const { data } = await checkReference({ data: values });

    if (!data) {
      message.error("Sale Reference doesnot exist or Sale Return is Pending");
      setSaleExists(false);
      setRefId(null);
    } else {
      setRefId(values.reference_id);
      setSaleExists(true);
    }
  };
  return (
    <>
      {!saleExists ? (
        <CustomForm
          handleSubmit={handleSubmit}
          form={referenceForm}
          submitBtnText={"Check Reference"}
          isLoading={isLoading}
        >
          <Row {...rowLayout}>
            <Col {...fullColLayout}>
              <CustomInput
                label="Sale Reference"
                name={"reference_id"}
                required={true}
              />
            </Col>
          </Row>
        </CustomForm>
      ) : (
        <CustomForm {...props}>
          <Row {...rowLayout}>
            <ReturnComponent
              reference_id={refId}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Row>
        </CustomForm>
      )}
    </>
  );
};

export default SaleReturnForm;
