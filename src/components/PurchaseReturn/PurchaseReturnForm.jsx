import { Col, Form, App, Row } from "antd";
import { useEffect, useState } from "react";
import {
  colLayout,
  fullColLayout,
  mdColLayout,
  rowLayout,
} from "../../layout/FormLayout";
import { useCheckReferenceMutation } from "../../redux/services/return/purchaseReturnApi";
import { useGetAllTaxQuery } from "../../redux/services/tax/taxApi";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
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

const PaymentType = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("payment_type", "Cash");
  }, [form]);

  const options = [
    {
      value: "Cash",
      label: "Cash",
    },
    {
      value: "Card",
      label: "Card",
    },
    {
      value: "Cheque",
      label: "Cheque",
    },
  ];

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
        <TaxComponent />
      </Col>

      <Col {...colLayout}>
        <CustomDatepicker
          label="Return Date"
          required={true}
          name={"purchase_return_at"}
        />
      </Col>

      <Col {...colLayout}>
        <PaymentType form={props.form} />
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

const PurchaseReturnForm = ({
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
  const [checkReference, { isLoading }] = useCheckReferenceMutation();

  const { message } = App.useApp();

  const [saleExists, setSaleExists] = useState(false);
  const [refId, setRefId] = useState(null);

  const handleSubmit = async (values) => {
    const { data } = await checkReference({ data: values });

    if (!data.data) {
      message.error(
        "Purchase Reference doesnot exist or Purchase Return is Pending"
      );
      setSaleExists(false);
      setRefId(null);
    } else {
      setSaleData(data?.data);

      data?.data?.purchase_products?.map((item) => {
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
              purchase_unit_id: {
                ...prevFormValues.product_list.purchase_unit_id,
                [item.product_id.toString()]: item.purchase_unit_id.toString(),
              },
              net_unit_cost: {
                ...prevFormValues.product_list.net_unit_cost,
                [item.product_id.toString()]: item.net_unit_cost.toString(),
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
            purchase_unit_id: item?.products?.purchase_unit_id,
            buying_price: item?.products?.buying_price,
            purchase_units: item?.products?.purchase_units,
            taxes: item?.products?.taxes,
          },
        ]);

        setProductUnits((prevProductUnits) => ({
          ...prevProductUnits,
          purchase_units: {
            ...prevProductUnits.purchase_units,
            [item.product_id.toString()]: item.products?.purchase_units
              ? item.products?.purchase_units?.operation_value ?? 1
              : 1 ?? 1,
          },
        }));
      });

      setRefId(values.reference_id);
      setSaleExists(true);
    }
  };

  // const tax_rate = Form.useWatch("tax_rate", props.form);

  // const deleteRow = Form.useWatch("delete", props.form);

  // console.log(formValues);

  // const updatedList = saleExists
  //   ? updateProductList(deleteRow, formValues.product_list)
  //   : [];

  // const totalItems = Object.keys(updatedList?.qty)?.length ?? 0;
  // const totalQty = Object.values(updatedList?.qty).reduce(
  //   (acc, cur) => acc + (parseFloat(cur) || 0),
  //   0
  // );

  // const totalPrice = calculateTotalPrice(updatedList);

  // const grandTotal = calculateGrandTotal(totalPrice, tax_rate ?? 0);

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
                label="Purchase Reference"
                name={"reference_id"}
                required={true}
              />
            </Col>
          </Row>
        </CustomForm>
      ) : (
        <>
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
          {/* <Row className="pb-20">
              <Col {...fullColLayout}>
                <Row className="rounded-md overflow-hidden">
                  <Col
                    span={6}
                    className="border flex justify-between items-center px-2 py-5 text-lg"
                  >
                    <span className="font-semibold ">Items</span>
                    <span>
                      {totalItems} ({totalQty})
                    </span>
                  </Col>
                  <Col
                    span={6}
                    className="border flex justify-between items-center px-2 py-5 text-lg"
                  >
                    <span className="font-semibold ">Total</span>
                    <span>{Number(totalPrice).toFixed(2)}</span>
                  </Col>
                  <Col
                    span={6}
                    className="border flex justify-between items-center px-2 py-5 text-lg"
                  >
                    <span className="font-semibold ">Tax</span>
                    <span>{Number(tax_rate ?? 0).toFixed(2)}</span>
                  </Col>
  
                  <Col
                    span={6}
                    className="border flex justify-between items-center px-2 py-5 text-lg"
                  >
                    <span className="font-semibold ">Grand Total</span>
                    <span>{Number(grandTotal).toFixed(2)}</span>
                  </Col>
                </Row>
              </Col>
            </Row> */}
        </>
      )}
    </>
  );
};
export default PurchaseReturnForm;
