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

const ReturnComponent = ({ reference_id, ...props }) => {
  return (
    <>
      <div className=" text-lg font-semibold text-center w-full underline ">
        Reference ID: {reference_id}
      </div>
      <ReturnProductTable {...props} />

      <Col {...mdColLayout}>
        <TaxComponent />
      </Col>

      <Col {...fullColLayout}>
        <CustomUploader label={"Attach Document"} name={"logo"} />
      </Col>

      <Col {...mdColLayout}>
        <CustomInput type={"textarea"} name="return_note" label="Return Note" />
      </Col>
      <Col {...mdColLayout}>
        <CustomInput type={"textarea"} name="staff_note" label="Staff Note" />
      </Col>
    </>
  );
};

const SaleReturnForm = ({
  formValues,
  setFormValues,
  productUnits,
  setProductUnits,
  products,
  setProducts,
  ...props
}) => {
  const [referenceForm] = Form.useForm();

  const [checkReference, { isLoading }] = useCheckReferenceMutation();

  const [saleExists, setSaleExists] = useState(false);
  const [refId, setRefId] = useState(null);

  console.log(products);
  console.log(formValues);

  const handleSubmit = async (values) => {
    const { data } = await checkReference({ data: values });

    if (!data) {
      message.error("Sale Reference doesnot exist or Sale Return is Pending");
      setSaleExists(false);
      setRefId(null);
    } else {
      console.log(data.data);
      data?.data?.sale_products?.map((item) => {
        console.log(item);
        setFormValues((prevFormValues) => {
          return {
            ...prevFormValues,
            product_list: {
              ...prevFormValues.product_list,
              product_id: {
                ...prevFormValues.product_list.product_id,
                [item.product_id.toString()]: item.product_id.toString(),
              },
              qty: {
                ...prevFormValues.product_list.qty,
                [item.product_id.toString()]: item?.qty.toString(),
              },
              sale_unit_id: {
                ...prevFormValues.product_list.sale_unit_id,
                [item.product_id.toString()]: item.sale_unit_id.toString(),
              },
              net_unit_price: {
                ...prevFormValues.product_list.net_unit_price,
                [item.product_id.toString()]: item.net_unit_price.toString(),
              },
              discount: {
                ...prevFormValues.product_list.discount,
                [item.product_id.toString()]: item.discount.toString(),
              },
              tax_rate: {
                ...prevFormValues.product_list.tax_rate,
                [item.product_id.toString()]: item.tax_rate.toString(),
              },
              tax: {
                ...prevFormValues.product_list.tax,
                [item.product_id.toString()]: item.tax.toString(),
              },
              total: {
                ...prevFormValues.product_list.total,
                [item.product_id.toString()]: item.total.toString(),
              },
              tax_id: {
                ...prevFormValues.product_list.tax_id,
                [item.product_id.toString()]: item.products?.tax_id.toString(),
              },
              sale_id: {
                ...prevFormValues.product_list.sale_id,
                [item.product_id.toString()]: item.sale_id?.toString(),
              },
            },
          };
        });
        setProducts((prevProducts) => [
          ...prevProducts,
          {
            id: item.product_id,
            name: item?.products?.name,
            sku: item?.products?.sku,
            sale_unit_id: item?.products?.sale_unit_id,
            buying_price: item?.products?.buying_price,
            sale_units: item?.products?.sale_units,
            taxes: item?.products?.taxes,
          },
        ]);

        setProductUnits((prevProductUnits) => ({
          ...prevProductUnits,
          sale_units: {
            ...prevProductUnits.sale_units,
            [item.product_id.toString()]: item.products?.sale_units
              ? item.products?.sale_units?.operation_value ?? 1
              : 1 ?? 1,
          },
        }));
      });

      setRefId(values.reference_id);
      setSaleExists(true);
    }
  };

  console.log(formValues);

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
              products={products}
              setProducts={setProducts}
              productUnits={productUnits}
              setProductUnits={setProductUnits}
            />
          </Row>
        </CustomForm>
      )}
    </>
  );
};

export default SaleReturnForm;
