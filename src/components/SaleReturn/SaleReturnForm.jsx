import { App, Col, Row } from "antd";
import { useState } from "react";
import {
  colLayout,
  fullColLayout,
  mdColLayout,
  rowLayout,
} from "../../layout/FormLayout";
import { useCheckReferenceMutation } from "../../redux/services/return/saleReturnApi";
import { useSetFieldValue } from "../../utilities/lib/updateFormValues/useInitialFormField";
import { OrderTaxComponent } from "../ReusableComponent/OrderTaxComponent";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomUploader from "../Shared/Upload/CustomUploader";
import { ReturnProductTable } from "./overview/ReturnProductTable";

const options = [
  {
    value: "Cash",
    label: "Cash",
  },
  {
    value: "Gift Card",
    label: "Gift Card",
  },
  {
    value: "Card",
    label: "Card",
  },
  {
    value: "Cheque",
    label: "Cheque",
  },
  {
    value: "Points",
    label: "Points",
  },
];

const PaymentType = () => {
  useSetFieldValue("payment_type", options[0].value);

  return (
    <CustomSelect
      label="Payment Type"
      options={options}
      name={"payment_type"}
    />
  );
};

const ReturnComponent = ({ reference_id, ...props }) => {
  return (
    <Row {...rowLayout}>
      <div className=" text-lg font-semibold text-center w-full underline ">
        Reference ID: {reference_id}
      </div>
      <div className="text-center w-full">
        Only Selected Items will be returned
      </div>
      <ReturnProductTable {...props} />

      <Col {...colLayout}>
        <OrderTaxComponent />
      </Col>

      <Col {...colLayout}>
        <CustomDatepicker
          label="Return Date"
          required={true}
          name={"sale_return_at"}
        />
      </Col>

      <Col {...colLayout}>
        <PaymentType />
      </Col>

      <Col {...fullColLayout}>
        <CustomUploader label={"Attach Document"} name={"attachment"} />
      </Col>

      <Col {...mdColLayout}>
        <CustomInput type={"textarea"} name="return_note" label="Return Note" />
      </Col>
      <Col {...mdColLayout}>
        <CustomInput type={"textarea"} name="staff_note" label="Staff Note" />
      </Col>
    </Row>
  );
};

const SaleReturnForm = ({
  formValues,
  setFormValues,
  productUnits,
  setProductUnits,
  products,
  setProducts,
  setSaleData,
  id,
  referenceId,
  ...props
}) => {
  const { message } = App.useApp();
  const [checkReference, { isLoading }] = useCheckReferenceMutation();

  const [saleExists, setSaleExists] = useState(false);
  const [refId, setRefId] = useState(null);

  const handleSubmit = async (values) => {
    const { data, error } = await checkReference({ data: values });

    if (data?.data) {
      setSaleData(data?.data);
      data?.data?.sale_products?.map((item) => {
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

              max_return: {
                ...prevFormValues.product_list.max_return,
                [item.product_id.toString()]: item.qty?.toString(),
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
            [item.product_id.toString()]:
              item?.products?.sale_units?.operation_value ?? 1,
          },
        }));
      });

      setRefId(values.reference_id);
      setSaleExists(true);
    }

    if (error) {
      message.error(
        error?.data?.message ??
          "Sale Reference doesnot exist or Sale Return is Pending"
      );
      setSaleExists(false);
      setRefId(null);
    }
  };

  return (
    <>
      {!saleExists && !id ? (
        <CustomForm
          handleSubmit={handleSubmit}
          form={props.form}
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
          <ReturnComponent
            reference_id={referenceId ?? refId}
            formValues={formValues}
            setFormValues={setFormValues}
            products={products}
            setProducts={setProducts}
            productUnits={productUnits}
            setProductUnits={setProductUnits}
            form={props.form}
          />
        </CustomForm>
      )}
    </>
  );
};

export default SaleReturnForm;
