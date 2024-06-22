import { Button, Col, Form, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { FaEdit, FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { colLayout, rowLayout } from "../../../layout/FormLayout";
import { useGetAllUnitQuery } from "../../../redux/services/unit/unitApi";
import CustomForm from "../../Shared/Form/CustomForm";
import CustomInput from "../../Shared/Input/CustomInput";
import { CustomQuantityInput } from "../../Shared/Input/CustomQuantityInput";
import { ProductController } from "../../Shared/ProductControllerComponent/ProductController";
import CustomSelect from "../../Shared/Select/CustomSelect";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name, record) => (
      <div
        className={`flex items-center gap-2 ${
          name !== "Total" && "hover:underline hover:cursor-pointer"
        }`}
        onClick={() => {
          record?.handleProductEdit(record?.id, record?.name);
        }}
      >
        <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
          {name}
        </span>
        {name !== "Total" && <FaEdit className="primary-text" />}
      </div>
    ),
  },
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
    align: "center",
    width: 100,
    render: (sku) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {sku}
      </span>
    ),
  },
  {
    title: "Unit Cost",
    dataIndex: "unitCost",
    key: "unitCost",
    align: "center",
    width: 100,
    render: (unitCost) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {unitCost ?? 0}
      </span>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
    width: 140,
    render: (quantity, record) => {
      return quantity > -1 ? (
        <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
          {quantity}
        </span>
      ) : (
        <div className="flex gap-1 justify-center items-center">
          <div>
            <Button
              key={"sub"}
              icon={<FaMinus />}
              type="primary"
              onClick={() => record.decrementCounter(record?.id)}
            />
          </div>
          <CustomQuantityInput
            name={["product_list", "qty", record?.id]}
            noStyle={true}
            onChange={(value) => record.onQuantityChange(record.id, value)}
          />
          <div>
            <Button
              key={"add"}
              icon={<FaPlus />}
              type="primary"
              onClick={() => record.incrementCounter(record?.id)}
              className=""
            />
          </div>
        </div>
      );
    },
  },
  {
    title: "Tax",
    dataIndex: "tax",
    key: "tax",
    align: "center",
    width: 100,
    render: (tax) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        ${tax}
      </span>
    ),
  },
  {
    title: "SubTotal",
    dataIndex: "subTotal",
    key: "subTotal",
    align: "center",
    width: 100,
    render: (subTotal) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        ${subTotal}
      </span>
    ),
  },
  {
    title: <MdDelete className="text-lg md:text-xl text-center w-full" />,
    dataIndex: "delete",
    key: "delete",
    align: "center",
    width: 50,
    fixed: "right",
    render: (props, record) => {
      return (
        props && (
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => record.onDelete(record.id)}
              className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
              type="button"
            >
              <MdDelete className="text-lg md:text-xl" />
            </button>
          </div>
        )
      );
    },
  },
];

const ProductUnitComponent = ({ setProductUnits, productId }) => {
  const { data, isLoading } = useGetAllUnitQuery({});

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
        purchase_units: {
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

          net_unit_cost: {
            ...prevFormValues.product_list.net_unit_cost,
            [productId]: productForm.getFieldValue("unit_price"),
          },
          //   tax_rate: {
          //     ...prevFormValues.product_list.tax_rate,
          //     [productId]: productUnits?.tax_rate[productId],
          //   },
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
        </Row>
      </CustomForm>
    </Modal>
  );
};

// function setFormValuesId(
//   id,
//   purchase_unit_id,
//   unit_cost,
//   purchase_units,
//   formValues,
//   productUnits,
//   tax_id,
//   // eslint-disable-next-line no-unused-vars
//   taxes
// ) {
//   if (id) {
//     formValues.product_list.qty[id] = formValues.product_list.qty[id] || 1;

//     formValues.product_list.net_unit_cost[id] =
//       formValues.product_list.net_unit_cost[id] ?? unit_cost ?? "0";

//     formValues.product_list.tax[id] = parseFloat(
//       (
//         (parseInt(productUnits.purchase_units?.[id] ?? 1) *
//           parseInt(formValues.product_list.tax_rate[id]) *
//           parseInt(formValues.product_list.net_unit_cost[id]) *
//           parseInt(formValues.product_list.qty[id])) /
//         100
//       ).toFixed(2)
//     );

//     // console.log(purchase_units);
//     // console.log(productUnits);

//     // console.log(formValues.product_list);

//     formValues.product_list.tax_rate[id] =
//       formValues.product_list.tax_rate[id] ?? 0;

//     const saleUnitsOperationValue = purchase_units
//       ? purchase_units?.operation_value !== null
//         ? purchase_units?.operation_value
//         : 1
//       : 1;

//     productUnits.purchase_units[id] =
//       productUnits?.purchase_units[id] ?? saleUnitsOperationValue;

//     formValues.product_list.total[id] =
//       productUnits.purchase_units[id] *
//         parseInt(formValues.product_list.net_unit_cost[id] ?? 0) *
//         formValues.product_list.qty[id] +
//       formValues.product_list.tax[id];

//     formValues.product_list.purchase_unit_id[id] =
//       formValues.product_list.purchase_unit_id[id] ?? purchase_unit_id;

//     if (formValues?.product_list?.tax_id) {
//       formValues.product_list.tax_id[id] =
//         formValues.product_list?.tax_id?.[id] ?? tax_id;
//     }
//   }
// }

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
  const sanitizeIntValue = (value) => {
    const number = parseInt(value);
    return isNaN(number) ? 0 : number;
  };

  const sanitizeFloatValue = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? 0 : number;
  };

  if (id) {
    formValues.product_list.qty[id] = sanitizeIntValue(
      formValues.product_list.qty?.[id] || 1
    );

    formValues.product_list.net_unit_cost[id] =
      sanitizeFloatValue(formValues.product_list.net_unit_cost?.[id]) ||
      sanitizeFloatValue(unit_cost) ||
      "0";

    formValues.product_list.tax_rate[id] = sanitizeIntValue(
      taxes?.rate ?? formValues.product_list.tax_rate?.[id] ?? 0
    );

    formValues.product_list.tax[id] = sanitizeFloatValue(
      (
        (sanitizeIntValue(productUnits.purchase_units?.[id] ?? 1) *
          sanitizeIntValue(formValues.product_list.tax_rate?.[id]) *
          sanitizeFloatValue(formValues.product_list.net_unit_cost?.[id]) *
          sanitizeIntValue(formValues.product_list.qty?.[id])) /
        100
      ).toFixed(2)
    );

    const saleUnitsOperationValue = purchase_units?.operation_value ?? 1;

    productUnits.purchase_units[id] =
      sanitizeIntValue(productUnits?.purchase_units?.[id]) ||
      saleUnitsOperationValue;

    formValues.product_list.total[id] =
      sanitizeIntValue(productUnits.purchase_units?.[id]) *
        sanitizeFloatValue(formValues.product_list.net_unit_cost?.[id] ?? 0) *
        sanitizeIntValue(formValues.product_list.qty?.[id]) +
      sanitizeFloatValue(formValues.product_list.tax?.[id]);

    formValues.product_list.purchase_unit_id[id] =
      formValues.product_list.purchase_unit_id?.[id] ?? purchase_unit_id;

    if (formValues?.product_list?.tax_id) {
      formValues.product_list.tax_id[id] =
        formValues.product_list?.tax_id?.[id] ?? tax_id;
    }
  }
}

export const TransferProductTable = ({
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

  const dataSource =
    products?.map((product) => {
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

      console.log(id);

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
        incrementCounter,
        decrementCounter,
        onQuantityChange,
        tax: formValues.product_list.tax[id],
        subTotal: formValues.product_list.total[id],
        onDelete,
        handleProductEdit,
      };
    }) ?? [];

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTax, setTotalTax] = useState(0);

  useEffect(() => {
    if (products.length > 0) {
      const sanitizeIntValue = (value) => {
        const number = parseInt(value);
        return isNaN(number) ? 0 : number;
      };

      const sanitizeFloatValue = (value) => {
        const number = parseFloat(value);
        return isNaN(number) ? 0 : number;
      };

      const total = Object.values(formValues.product_list.qty).reduce(
        (acc, cur) => acc + sanitizeIntValue(cur),
        0
      );
      setTotalQuantity(total);

      const totalPrice = Object.values(formValues.product_list.total).reduce(
        (acc, cur) => acc + sanitizeFloatValue(cur),
        0
      );
      setTotalPrice(totalPrice.toFixed(2));

      const totalTax = Object.values(formValues.product_list.tax).reduce(
        (acc, cur) => acc + sanitizeFloatValue(cur),
        0
      );
      setTotalTax(totalTax.toFixed(2));
    }
  }, [formValues, products]);

  products?.length > 0 &&
    dataSource.push({
      id: "",
      name: "Total",
      quantity: totalQuantity,
      subTotal: totalPrice,
      tax: totalTax,
    });

  console.log(Object.keys(formValues.product_list.qty).length);

  // useEffect(() => {

  //   if (
  //     products.length === 0 &&
  //     Object.keys(formValues.product_list.qty).length === 0
  //   ) {
  //     setFormValues({
  //       product_list: { qty: {}, action: {} },
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [products, setFormValues]);

  form.setFieldsValue(formValues);

  return (
    <>
      <ProductController
        products={products}
        setProducts={setProducts}
        columns={columns}
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
