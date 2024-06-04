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

const TaxComponent = () => {
  const { data, isLoading } = useGetAllTaxQuery({});

  const options = data?.results?.tax?.map((tax) => ({
    value: tax.id.toString(),
    label: tax.name,
  }));

  return (
    <CustomSelect
      name="tax_rate"
      options={options}
      label="Product Tax"
      isLoading={isLoading}
    />
  );
};

const ProductUnitComponent = () => {
  const { data, isLoading } = useGetAllUnitQuery({
    params: {
      selectValue: ["name", "id", "for"],
    },
  });

  const productUnits = data?.results?.unit
    ?.filter((unit) => unit.for === "product-unit")
    .map((unit) => ({ value: unit.id.toString(), label: unit.name }));

  console.log(data?.results?.unit);

  return (
    <CustomSelect
      label="Product Unit"
      options={productUnits}
      isLoading={isLoading}
      name={"product_unit"}
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
}) => {
  const [productForm] = Form.useForm();
  // const form = Form.useFormInstance();

  useEffect(() => {
    console.log(formValues);
    productForm.setFieldsValue({
      quantity: formValues?.product_list?.qty[productId],
      unit_discount: formValues?.product_list?.discount[productId],
      unit_price: formValues?.product_list?.net_unit_price[productId],
    });
  }, [formValues, productForm, productId]);

  const handleSubmit = () => {
    console.log("values");

    console.log(productForm.getFieldsValue());

    // productForm.resetFields();
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
      // onClose={}
    >
      <CustomForm
        submitBtn={false}
        form={productForm}
        // handleSubmit={handleSubmit}
      >
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
            <TaxComponent />
          </Col>
          <Col {...fullColLayout}>
            <ProductUnitComponent />
          </Col>
        </Row>
      </CustomForm>
    </Modal>
  );
};

export const QuotationProductTable = () => {
  const [products, setProducts] = useState([]);
  const form = Form.useFormInstance();

  const warehouseId = Form.useWatch("warehouse_id", form);

  const [formValues, setFormValues] = useState({
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

  const [productEditModal, setProductEditModal] = useState(false);
  const [productId, setProductId] = useState(undefined);
  const [productName, setProductName] = useState(null);

  const handleProductEdit = (id, name) => {
    setProductId(id);
    setProductName(name);
    setProductEditModal(true);
  };

  const hideModal = () => setProductEditModal(false);

  const incrementCounter = (id, stock = 5) => {
    setFormValues((prevFormValues) => {
      const stockValue = stock > 0 ? 1 : 0;
      const currentQty = prevFormValues.product_list.qty[id] || stockValue;
      const newQty = Math.min(currentQty + 1, stock);

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

  const decrementCounter = (id, stock = 5) => {
    setFormValues((prevFormValues) => {
      const stockValue = stock > 0 ? 1 : 0;

      const currentQty = prevFormValues.product_list.qty[id] || stockValue;
      const newQty = Math.max(currentQty - 1, 0);

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

  const dataSource = products?.map((product) => {
    const {
      id,
      name,
      sku,
      buying_price: unit_cost,
      product_qties,
      sale_unit_id,
    } = product;

    console.log(product);

    const stock = parseInt(
      product_qties.filter((item) => item.warehouse_id === warehouseId)[0]
        ?.qty ?? 0
    );

    const stockValue = stock > 0 ? 1 : 0;

    formValues.product_list.qty[id] =
      formValues.product_list.qty[id] || stockValue;

    formValues.product_list.sale_unit_id[id] = sale_unit_id;

    formValues.product_list.net_unit_price[id] = unit_cost;

    formValues.product_list.discount[id] =
      formValues.product_list.discount[id] ?? 0;

    formValues.product_list.tax[id] = formValues.product_list.tax[id] ?? 0;

    formValues.product_list.total[id] =
      parseInt(unit_cost) * formValues.product_list.qty[id];

    return {
      id,
      name,
      sku,
      stock: stock,
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
  const [totalSubTotal, setTotalSubTotal] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  useEffect(() => {
    const total = Object.values(formValues.product_list.qty).reduce(
      (acc, cur) => acc + cur,
      0
    );

    const totalSubTotal = Object.values(formValues.product_list.total).reduce(
      (acc, cur) => acc + cur,
      0
    );

    const totalTax = Object.values(formValues.product_list.tax).reduce(
      (acc, cur) => acc + cur,
      0
    );

    const totalDiscount = Object.values(
      formValues.product_list.discount
    ).reduce((acc, cur) => acc + cur, 0);

    setTotalQuantity(total);
    setTotalSubTotal(totalSubTotal);
    setTotalTax(totalTax);
    setTotalDiscount(totalDiscount);
  }, [formValues, products]);

  products.length > 0 &&
    dataSource.push({
      id: "total",
      name: "Total",
      quantity: totalQuantity,
      subTotal: totalSubTotal,
      tax: totalTax,
      discount: totalDiscount,
      action: false,
    });

  useEffect(() => {
    if (products.length === 0) {
      setFormValues({
        product_list: {
          qty: {},
          action: {},
          sale_unit_id: {},
          net_unit_price: {},
          discount: {},
          tax_rate: {},
          tax: {},
          total: {},
        },
      });
    }
  }, [products]);

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
      />
    </>
  );
};
