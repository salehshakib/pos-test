import { Col, Form, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { fullColLayout, rowLayout } from "../../../../layout/FormLayout";
import CustomForm from "../../../Shared/Form/CustomForm";
import CustomInput from "../../../Shared/Input/CustomInput";
import { ProductController } from "../../../Shared/ProductControllerComponent/ProductController";
import { columns } from "./productColumns";
import { useGetAllTaxQuery } from "../../../../redux/services/tax/taxApi";
import CustomSelect from "../../../Shared/Select/CustomSelect";
import { useGetAllUnitQuery } from "../../../../redux/services/unit/unitApi";

const TaxComponent = ({ productId }) => {
  const { data, isLoading } = useGetAllTaxQuery({});

  const options = data?.results?.tax?.map((tax) => ({
    value: tax.rate,
    label: tax.name,
  }));

  return (
    <CustomSelect
      name={["tax_rate", productId]}
      options={options}
      label="Product Tax"
      isLoading={isLoading}
    />
  );
};

const ProductUnitComponent = ({ setProductUnits, productId }) => {
  const { data, isLoading } = useGetAllUnitQuery({
    params: {
      selectValue: ["name", "id", "for", "operator", "operation_value"],
    },
  });

  const productUnits = data?.results?.unit
    ?.filter((unit) => unit.for === "sale-unit")
    .map((unit) => ({
      value: unit.id.toString(),
      label: unit.name,
      operationValue: unit.operation_value,
    }));

  const onSelect = (value, option) => {
    setProductUnits((prevValues) => {
      return {
        ...prevValues,
        sale_units: {
          [productId]: option.operationValue ?? 1,
        },
      };
    });
  };

  return (
    <CustomSelect
      label="Sale Unit"
      options={productUnits}
      isLoading={isLoading}
      name={["sale_unit_id", productId]}
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

  console.log(productUnits);

  useEffect(() => {
    productForm.setFieldsValue({
      quantity: formValues?.product_list?.qty[productId],
      unit_discount: formValues?.product_list?.discount[productId],
      unit_price: formValues?.product_list?.net_unit_price[productId],
      sale_unit_id: {
        [productId]: formValues?.product_list?.sale_unit_id[productId] ?? "",
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues, productForm, productId]);

  const handleSubmit = () => {
    console.log(productForm.getFieldsValue());

    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        product_list: {
          ...prevFormValues.product_list,
          qty: {
            ...prevFormValues.product_list.qty,
            [productId]: productForm.getFieldValue("quantity"),
          },
          sale_unit_id: {
            ...prevFormValues.product_list.sale_unit_id,
            [productId]: productForm.getFieldValue(["sale_unit_id", productId]),
          },
          discount: {
            ...prevFormValues.product_list.discount,
            [productId]: productForm.getFieldValue("unit_discount"),
          },
          net_unit_price: {
            ...prevFormValues.product_list.net_unit_price,
            [productId]: productForm.getFieldValue("unit_price"),
          },
          tax_rate: {
            ...prevFormValues.product_list.tax_rate,
            [productId]: productForm.getFieldValue(["tax_rate", productId]),
          },
          tax: {
            ...prevFormValues.product_list.tax,
            [productId]: parseFloat(
              (parseInt(productUnits.sale_units[productId]) *
                parseInt(productForm.getFieldValue(["tax_rate", productId])) *
                parseInt(productForm.getFieldValue("quantity")) *
                parseInt(productForm.getFieldValue("unit_price"))) /
                100
            ).toFixed(2),
          },
        },
      };
    });

    // setProductUnits((prevValues) => {
    //   return {
    //     ...prevValues,
    //     sale_unit_id: {
    //       ...prevValues.sale_units,
    //       [productId]: productForm.getFieldValue(["sale_unit_id", productId]),
    //     },
    //   };
    // });

    hideModal();
    // productForm.resetFields();
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
          <Col {...fullColLayout}>
            <CustomInput
              label="Quantity"
              type={"number"}
              name={"quantity"}
              placeholder={"Enter product name"}
            />
          </Col>
          <Col {...fullColLayout}>
            <CustomInput
              label="Unit Discount"
              type={"number"}
              name={"unit_discount"}
            />
          </Col>
          <Col {...fullColLayout}>
            <CustomInput
              label="Unit Price"
              type={"number"}
              name={"unit_price"}
            />
          </Col>
          <Col {...fullColLayout}>
            <TaxComponent productId={productId} />
          </Col>
          <Col {...fullColLayout}>
            <ProductUnitComponent
              setProductUnits={setProductUnits}
              productId={productId}
            />
          </Col>
        </Row>
      </CustomForm>
    </Modal>
  );
};

export const QuotationProductTable = ({
  formValues,
  setFormValues,
  products,
  setProducts,
}) => {
  const form = Form.useFormInstance();
  const warehouseId = Form.useWatch("warehouse_id", form);

  console.log(formValues);

  const [productUnits, setProductUnits] = useState({
    sale_units: {},
    // sale_unit_id: {},
  });

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

  const incrementCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.product_list.qty[id] || 1;
      const newQty = currentQty + 1;

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
      const newQty = currentQty - 1;

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

  const onDelete = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  console.log(formValues);

  const setFormValuesId = (id, sale_unit_id, unit_cost, sale_units) => {
    formValues.product_list.qty[id] = formValues.product_list.qty[id] || 1;

    formValues.product_list.sale_unit_id[id] =
      formValues.product_list.sale_unit_id[id] ?? sale_unit_id;

    formValues.product_list.net_unit_price[id] = unit_cost;

    formValues.product_list.discount[id] =
      formValues.product_list.discount[id] ?? 0;

    formValues.product_list.tax[id] = parseFloat(
      (
        (parseInt(productUnits.sale_units[id]) *
          parseInt(formValues.product_list.tax_rate[id]) *
          parseInt(formValues.product_list.net_unit_price[id]) *
          parseInt(formValues.product_list.qty[id])) /
        100
      ).toFixed(2)
    );

    formValues.product_list.tax_rate[id] =
      formValues.product_list.tax_rate[id] ?? 0;

    productUnits.sale_units[id] =
      productUnits?.sale_units[id] ?? sale_units?.operation_value ?? 1;

    formValues.product_list.total[id] =
      productUnits.sale_units[id] *
        parseInt(unit_cost) *
        formValues.product_list.qty[id] -
      formValues.product_list.discount[id] +
      formValues.product_list.tax[id];
  };

  const dataSource = products?.map((product) => {
    const {
      id,
      name,
      sku,
      buying_price: unit_cost,
      sale_unit_id,
      sale_units,
    } = product ?? {};

    console.log(product);

    setFormValuesId(id, sale_unit_id, unit_cost, sale_units);

    return {
      id,
      name,
      sku,
      unitCost: formValues.product_list.net_unit_price[id],
      delete: true,
      discount: formValues.product_list.discount[id],
      tax: formValues.product_list.tax[id],
      subTotal: formValues.product_list.total[id],
      incrementCounter,
      decrementCounter,
      onQuantityChange,
      onDelete,
      handleProductEdit,
    };
  });

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  useEffect(() => {
    const total = Object.values(formValues.product_list.qty).reduce(
      (acc, cur) => acc + cur,
      0
    );
    setTotalQuantity(total);

    const totalPrice = Object.values(formValues.product_list.total).reduce(
      (acc, cur) => acc + cur,
      0
    );
    setTotalPrice(totalPrice?.toFixed(2));

    const totalTax = Object.values(formValues.product_list.tax).reduce(
      (acc, cur) => acc + cur,
      0
    );
    setTotalTax(totalTax.toFixed(2));

    const totalDiscount = Object.values(
      formValues.product_list.discount
    ).reduce((acc, cur) => acc + cur, 0);

    setTotalDiscount(totalDiscount.toFixed(2));
  }, [formValues, products]);

  products.length > 0 &&
    dataSource.push({
      id: "total",
      name: "Total",
      quantity: totalQuantity,
      subTotal: totalPrice,
      tax: totalTax,
      discount: totalDiscount,
      action: false,
    });

  useEffect(() => {
    if (
      products.length === 0 &&
      !Object.keys(formValues.product_list.qty).length > 0
    ) {
      setFormValues({
        product_list: {
          qty: {},
          sale_unit_id: {},
          net_unit_price: {},
          discount: {},
          tax_rate: {},
          tax: {},
          total: {},
        },
      });

      setProductUnits({
        sale_units: {},
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, setFormValues]);

  form.setFieldsValue(formValues);

  return (
    <>
      {warehouseId && (
        <ProductController
          products={products}
          setProducts={setProducts}
          columns={columns}
          dataSource={dataSource}
        />
      )}

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
