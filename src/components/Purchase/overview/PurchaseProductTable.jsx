import { Col, Form, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { colLayout, mdColLayout, rowLayout } from "../../../layout/FormLayout";
import { useGetAllTaxQuery } from "../../../redux/services/tax/taxApi";
import { useGetAllUnitQuery } from "../../../redux/services/unit/unitApi";
import CustomForm from "../../Shared/Form/CustomForm";
import CustomInput from "../../Shared/Input/CustomInput";
import { ProductController } from "../../Shared/ProductControllerComponent/ProductController";
import CustomSelect from "../../Shared/Select/CustomSelect";
import { columns, partialColumns } from "./productColumns";

const TaxComponent = ({ productId, setProductUnits }) => {
  const { data, isLoading } = useGetAllTaxQuery({});

  const options = data?.results?.tax?.map((tax) => ({
    value: tax.id?.toString(),
    label: tax.name,
    rate: tax.rate,
  }));

  const onSelect = (value, option) => {
    setProductUnits((prevValues) => {
      return {
        ...prevValues,
        tax_rate: {
          [productId]: option.rate ?? 0,
        },
      };
    });
  };

  return (
    <CustomSelect
      name={["tax_id", productId]}
      options={options}
      label="Product Tax"
      isLoading={isLoading}
      onSelect={onSelect}
    />
  );
};

const ProductUnitComponent = ({ setProductUnits, productId }) => {
  const { data, isLoading } = useGetAllUnitQuery({});

  const productUnits = data?.results?.unit
    ?.filter((unit) => unit.for === "purchase-unit")
    .map((unit) => ({
      value: unit.id.toString(),
      label: unit.name,
      operationValue: unit.operation_value,
    }));

  const onSelect = (value, option) => {
    setProductUnits((prevValues) => {
      return {
        ...prevValues,
        purchase_units: {
          [productId]: option.operationValue ?? 1,
        },
      };
    });
  };

  return (
    <CustomSelect
      label="Purchase Unit"
      options={productUnits}
      isLoading={isLoading}
      name={["purchase_unit_id", productId]}
      onSelect={onSelect}
    />
  );
};

const ProductFormComponent = ({
  productId,
  productName,
  productEditModal,
  hideModal,
  formValues,
  setFormValues,
  productUnits,
  setProductUnits,
}) => {
  const [productForm] = Form.useForm();

  useEffect(() => {
    if (productId) {
      productForm.setFieldsValue({
        quantity: formValues?.product_list?.qty[productId],
        unit_discount: formValues?.product_list?.discount[productId],
        unit_price: formValues?.product_list?.net_unit_cost[productId],
        purchase_unit_id: {
          [productId]:
            formValues?.product_list?.purchase_unit_id[productId]?.toString() ??
            "",
        },
        tax_id: {
          [productId]:
            formValues?.product_list?.tax_id[productId]?.toString() ?? "",
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues, productForm, productId]);

  const handleSubmit = () => {
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        product_list: {
          ...prevFormValues.product_list,
          qty: {
            ...prevFormValues.product_list.qty,
            [productId]: productForm.getFieldValue("quantity"),
          },
          purchase_unit_id: {
            ...prevFormValues.product_list.purchase_unit_id,
            [productId]: productForm.getFieldValue([
              "purchase_unit_id",
              productId,
            ]),
          },
          discount: {
            ...prevFormValues.product_list.discount,
            [productId]: productForm.getFieldValue("unit_discount"),
          },
          net_unit_cost: {
            ...prevFormValues.product_list.net_unit_cost,
            [productId]: productForm.getFieldValue("unit_price"),
          },
          tax_rate: {
            ...prevFormValues.product_list.tax_rate,
            [productId]: productUnits?.tax_rate[productId],
          },
          tax: {
            ...prevFormValues.product_list.tax,
            [productId]: parseFloat(
              (parseInt(productUnits.purchase_units[productId]) *
                parseInt(productUnits.tax_rate[productId]) *
                parseInt(productForm.getFieldValue("quantity")) *
                parseInt(productForm.getFieldValue("unit_price"))) /
                100
            ).toFixed(2),
          },
          tax_id: {
            ...prevFormValues.product_list.tax_id,
            [productId]: productForm.getFieldValue(["tax_id", productId]),
          },
        },
      };
    });

    hideModal();
  };

  return (
    <Modal
      title={productName}
      open={productEditModal}
      onCancel={hideModal}
      centered
      width={800}
      okText="Update"
      onOk={handleSubmit}
    >
      <CustomForm submitBtn={false} form={productForm}>
        <Row {...rowLayout}>
          <Col {...colLayout}>
            <CustomInput
              label="Quantity"
              type={"number"}
              name={"quantity"}
              placeholder={"Enter product name"}
            />
          </Col>
          <Col {...colLayout}>
            <CustomInput
              label="Unit Price"
              type={"number"}
              name={"unit_price"}
            />
          </Col>
          <Col {...colLayout}>
            <ProductUnitComponent
              setProductUnits={setProductUnits}
              productId={productId}
            />
          </Col>
          <Col {...mdColLayout}>
            <CustomInput
              label="Unit Discount"
              type={"number"}
              name={"unit_discount"}
            />
          </Col>

          <Col {...mdColLayout}>
            <TaxComponent
              productId={productId}
              setProductUnits={setProductUnits}
            />
          </Col>
        </Row>
      </CustomForm>
    </Modal>
  );
};

function setFormValuesId(
  id,
  purchase_unit_id,
  unit_cost,
  purchase_units,
  formValues,
  productUnits,
  tax_id,

  // eslint-disable-next-line no-unused-vars
  taxes
) {
  if (id) {
    formValues.product_list.qty[id] = formValues.product_list.qty[id] || 1;

    formValues.product_list.net_unit_cost[id] =
      formValues.product_list.net_unit_cost[id] ?? unit_cost ?? "0";

    formValues.product_list.discount[id] =
      formValues.product_list.discount[id] ?? 0;

    formValues.product_list.tax[id] = parseFloat(
      (
        (parseInt(productUnits.purchase_units?.[id] ?? 1) *
          parseInt(formValues.product_list.tax_rate[id]) *
          parseInt(formValues.product_list.net_unit_cost[id]) *
          parseInt(formValues.product_list.qty[id])) /
        100
      ).toFixed(2)
    );

    formValues.product_list.tax_rate[id] =
      formValues.product_list.tax_rate[id] ?? 0;

    const saleUnitsOperationValue = purchase_units
      ? purchase_units?.operation_value !== null
        ? purchase_units?.operation_value
        : 1
      : 1;

    productUnits.purchase_units[id] =
      productUnits?.purchase_units[id] ?? saleUnitsOperationValue;

    formValues.product_list.total[id] =
      productUnits.purchase_units[id] *
        parseInt(formValues.product_list.net_unit_cost[id] ?? 0) *
        formValues.product_list.qty[id] -
      formValues.product_list.discount[id] +
      formValues.product_list.tax[id];

    formValues.product_list.purchase_unit_id[id] =
      formValues.product_list.purchase_unit_id[id] ?? purchase_unit_id;

    formValues.product_list.recieved[id] =
      formValues.product_list.recieved[id] ?? 0;

    if (formValues?.product_list?.tax_id) {
      formValues.product_list.tax_id[id] =
        formValues.product_list?.tax_id?.[id] ?? tax_id;
    }
  }
}

export const PurchaseProductTable = ({
  formValues,
  setFormValues,
  products,
  setProducts,
  productUnits,
  setProductUnits,
}) => {
  const form = Form.useFormInstance();

  const incrementCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.product_list.qty[id] || 1;
      const newQty = parseInt(currentQty) + 1;

      return {
        ...prevFormValues,
        product_list: {
          ...prevFormValues.product_list,
          qty: {
            ...prevFormValues.product_list.qty,
            [id]: newQty,
          },
        },
      };
    });
  };

  const decrementCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.product_list.qty[id] || 1;
      const newQty = Math.min(parseInt(currentQty) - 1, 0);

      return {
        ...prevFormValues,
        product_list: {
          ...prevFormValues.product_list,
          qty: {
            ...prevFormValues.product_list.qty,
            [id]: newQty,
          },
        },
      };
    });
  };

  const onQuantityChange = (id, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      product_list: {
        ...prevFormValues.product_list,
        qty: {
          ...prevFormValues.product_list.qty,
          [id]: parseInt(value, 10) || 0,
        },
      },
    }));
  };

  const incrementReceivedCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.product_list.recieved[id] || 0;
      const newQty = parseInt(currentQty) + 1;

      return {
        ...prevFormValues,
        product_list: {
          ...prevFormValues.product_list,
          recieved: {
            ...prevFormValues.product_list.recieved,
            [id]: newQty,
          },
        },
      };
    });
  };

  const decrementReceivedCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.product_list.recieved[id] || 0;
      const newQty = Math.min(parseInt(currentQty) - 1, 0);

      return {
        ...prevFormValues,
        product_list: {
          ...prevFormValues.product_list,
          recieved: {
            ...prevFormValues.product_list.recieved,
            [id]: newQty,
          },
        },
      };
    });
  };

  const onReceivedChange = (id, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      product_list: {
        ...prevFormValues.product_list,
        recieved: {
          ...prevFormValues.product_list.recieved,
          [id]: parseInt(value, 10) || 0,
        },
      },
    }));
  };

  // const onDelete = (id) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.filter((product) => product.id !== id)
  //   );
  // };

  const onDelete = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );

    setFormValues((prevFormValues) => {
      const { product_list } = prevFormValues;

      const updatedProductList = Object.keys(product_list).reduce(
        (acc, key) => {
          // eslint-disable-next-line no-unused-vars
          const { [id]: _, ...rest } = product_list[key];
          acc[key] = rest;
          return acc;
        },
        {}
      );

      return {
        ...prevFormValues,
        product_list: updatedProductList,
      };
    });
  };

  const [productEditModal, setProductEditModal] = useState(false);
  const [productId, setProductId] = useState(undefined);
  const [productName, setProductName] = useState(null);

  const handleProductEdit = (id, name) => {
    setProductId(id);
    setProductName(name);
    setProductEditModal(true);
  };

  const hideModal = () => {
    setProductEditModal(false);
  };

  const dataSource = products?.map((product) => {
    const {
      id,
      name,
      sku,
      buying_price: unit_cost,
      purchase_unit_id,
      purchase_units,
      tax_id,
      taxes,
    } = product ?? {};

    setFormValuesId(
      id,
      purchase_unit_id,
      unit_cost ?? 0,
      purchase_units,
      formValues,
      productUnits,
      tax_id,
      taxes
    );

    return {
      id,
      name,
      sku,
      unitCost: "$" + formValues.product_list.net_unit_cost[id],
      delete: true,
      discount: formValues.product_list.discount[id],
      tax: formValues.product_list.tax[id],
      subTotal: formValues.product_list.total[id],
      incrementCounter,
      decrementCounter,
      onQuantityChange,
      incrementReceivedCounter,
      decrementReceivedCounter,
      onReceivedChange,
      onDelete,
      handleProductEdit,
    };
  });

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  useEffect(() => {
    const total = Object.values(formValues.product_list.qty).reduce(
      (acc, cur) => acc + parseInt(cur),
      0
    );
    setTotalQuantity(total);

    const totalR = Object.values(formValues.product_list.recieved).reduce(
      (acc, cur) => acc + parseInt(cur),
      0
    );
    setTotalReceived(totalR);

    const totalPrice = Object.values(formValues.product_list.total).reduce(
      (acc, cur) => acc + parseFloat(cur),
      0
    );
    setTotalPrice(totalPrice?.toFixed(2));

    const totalTax = Object.values(formValues.product_list.tax).reduce(
      (acc, cur) => acc + parseFloat(cur),
      0
    );
    setTotalTax(totalTax.toFixed(2));

    const totalDiscount = Object.values(
      formValues.product_list.discount
    ).reduce((acc, cur) => acc + parseFloat(cur), 0);

    setTotalDiscount(totalDiscount.toFixed(2));
  }, [formValues, products]);

  products.length > 0 &&
    dataSource.push({
      id: "",
      name: "Total",
      unitCost: "",
      quantity: totalQuantity,
      received: totalReceived,
      subTotal: totalPrice,
      tax: totalTax,
      discount: totalDiscount,
      action: false,
    });

  form.setFieldsValue(formValues);

  const type = Form.useWatch("purchase_status", form);

  return (
    <>
      <ProductController
        products={products}
        setProducts={setProducts}
        columns={type === "Partial" ? partialColumns : columns}
        dataSource={dataSource}
      />

      <ProductFormComponent
        productEditModal={productEditModal}
        productId={productId}
        productName={productName}
        hideModal={hideModal}
        formValues={formValues}
        setFormValues={setFormValues}
        productUnits={productUnits}
        setProductUnits={setProductUnits}
      />
    </>
  );
};
