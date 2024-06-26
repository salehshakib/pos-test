export const incrementCounter = (id, setFormValues) => {
  setFormValues((prevFormValues) => {
    const currentQty = prevFormValues.product_list.qty[id] || 1;
    const newQty = Number(currentQty) + 1;

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

export const decrementCounter = (id, setFormValues) => {
  setFormValues((prevFormValues) => {
    const currentQty = prevFormValues.product_list.qty[id] || 1;
    const newQty = Math.max(Number(currentQty) - 1, 0);

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

export const onQuantityChange = (id, value, setFormValues) => {
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

export const onActionChange = (id, value, setFormValues) => {
  setFormValues((prevFormValues) => ({
    ...prevFormValues,
    product_list: {
      ...prevFormValues.product_list,
      action: {
        ...prevFormValues.product_list.action,
        [id]: value,
      },
    },
  }));
};

export const onDelete = (id, setProducts, setFormValues) => {
  setProducts((prevProducts) =>
    prevProducts.filter((product) => product.id !== id)
  );

  setFormValues((prevFormValues) => {
    const { product_list } = prevFormValues;

    const updatedProductList = Object.keys(product_list).reduce((acc, key) => {
      // eslint-disable-next-line no-unused-vars
      const { [id]: _, ...rest } = product_list[key];
      acc[key] = rest;
      return acc;
    }, {});

    return {
      ...prevFormValues,
      product_list: updatedProductList,
    };
  });
};
