import { openNotification } from '../openToaster';

export const incrementCounter = (
  id,
  setFormValues,
  stock,
  actionType,
  ignoreStock
) => {
  setFormValues((prevFormValues) => {
    const currentQty = prevFormValues.product_list.qty[id] ?? 0;

    if (actionType === 'Subtraction') {
      if (Number(currentQty) + 1 > parseInt(stock)) {
        openNotification('info', `Cannot add more than stock quantity`);
        return prevFormValues;
      }
    }

    if (stock && !ignoreStock) {
      if (Number(currentQty) + 1 > parseInt(stock)) {
        openNotification('info', `Cannot add more than stock quantity`);
        return prevFormValues;
      }
    }

    const newQty =
      stock && !ignoreStock
        ? Math.min(Number(currentQty) + 1, stock)
        : Number(currentQty) + 1;

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

export const onQuantityChange = (
  id,
  value,
  setFormValues,
  stock,
  actionType,
  ignoreStock
) => {
  const numericValue = Number(value);

  if (actionType === 'Subtraction') {
    if (Number(numericValue) + 1 > parseInt(stock)) {
      openNotification('info', `Cannot add more than stock quantity`);

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        product_list: {
          ...prevFormValues.product_list,
          qty: {
            ...prevFormValues.product_list.qty,
            [id]: stock,
          },
        },
      }));

      return;
    }
  }

  if (stock && !ignoreStock) {
    if (numericValue > Number(stock)) {
      openNotification(
        'info',
        `Cannot add more than stock quantity. Maximum stock is selected`
      );

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        product_list: {
          ...prevFormValues.product_list,
          qty: {
            ...prevFormValues.product_list.qty,
            [id]: stock,
          },
        },
      }));

      return;
    }
  }

  const newQty =
    stock && !ignoreStock
      ? Math.min(Math.max(parseInt(value, 10) || 0, 0), stock)
      : Math.max(parseInt(value, 10) || 0, 0);

  setFormValues((prevFormValues) => ({
    ...prevFormValues,
    product_list: {
      ...prevFormValues.product_list,
      qty: {
        ...prevFormValues.product_list.qty,
        [id]: newQty,
      },
    },
  }));
};

export const onActionChange = (id, value, setFormValues, stock) => {
  setFormValues((prevFormValues) => {
    // Create a new product_list object
    const newProductList = {
      ...prevFormValues.product_list,
      action: {
        ...prevFormValues.product_list.action,
        [id]: value,
      },
      qty: {
        ...prevFormValues.product_list.qty,
        // Reset quantity to 0 when action changes to 'Subtraction'
        ...(value === 'Subtraction' ? { [id]: stock } : {}),
      },
    };

    return {
      ...prevFormValues,
      product_list: newProductList,
    };
  });
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

    let updatedUnitList;

    if (prevFormValues.units) {
      updatedUnitList = Object.keys(prevFormValues.units).reduce((acc, key) => {
        // eslint-disable-next-line no-unused-vars
        const { [id]: _, ...rest } = prevFormValues.units[key];
        acc[key] = rest;
        return acc;
      }, {});
    }

    return {
      ...prevFormValues,
      product_list: updatedProductList,
      units: updatedUnitList,
    };
  });
};
