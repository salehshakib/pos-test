import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useGetTransferDetailsQuery,
  useUpdateTransferMutation,
} from '../../redux/services/transfer/transferApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import { getMissingUids } from '../../utilities/lib/deletedImageIds';
import { errorFieldsUpdate } from '../../utilities/lib/errorFieldsUpdate';
import { fieldsToUpdate } from '../../utilities/lib/fieldsToUpdate';
import {
  calculateGrandTotal,
  calculateTotalPrice,
  calculateTotalTax,
} from '../../utilities/lib/generator/generatorUtils';
import { openNotification } from '../../utilities/lib/openToaster';
import { decimalConverter } from '../../utilities/lib/return/decimalComverter';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import TransferForm from './TransferForm';

const TransferEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetTransferDetailsQuery(
    { id, params: { child: 1, parent: 1 } },
    { skip: !id }
  );
  const [updateTransfer, { isLoading }] = useUpdateTransferMutation();

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      const fieldData = fieldsToUpdate(data);

      setFields(fieldData);
    } else {
      setFields([]);
    }
  }, [data, isEditDrawerOpen, setFields]);

  console.log(fields);

  const handleUpdate = async (values, { formValues }) => {
    const formData = new FormData();

    const { product_list } = formValues;

    const { shipping_cost, attachment } = values ?? {};

    const productListArray = product_list?.qty
      ? Object.keys(product_list.qty)
          .filter((product_id) => product_list.qty[product_id] !== undefined)
          .map((product_id) => ({
            product_id: parseInt(product_id),
            qty: product_list.qty[product_id],
            purchase_unit_id: product_list.purchase_unit_id[product_id],
            net_unit_cost: decimalConverter(
              product_list.net_unit_cost[product_id]
            ),
            tax_rate: decimalConverter(product_list.tax_rate[product_id]),
            tax: decimalConverter(product_list.tax[product_id]),
            total: decimalConverter(product_list.total[product_id]),
          }))
      : [];

    if (productListArray.length === 0) {
      return openNotification('info', 'Please add atleast one product');
    }

    const totalPrice = calculateTotalPrice(product_list);
    const orderTax = calculateTotalTax(totalPrice, values.tax_rate);

    const totalQty =
      Object.values(formValues.product_list?.qty).reduce(
        (acc, cur) => acc + parseInt(cur),
        0
      ) ?? 0;

    const totalTax =
      Object.values(formValues.product_list?.tax).reduce(
        (acc, cur) => acc + parseFloat(cur),
        0
      ) ?? 0;

    const postObj = {
      ...values,
      shipping_cost: decimalConverter(shipping_cost),
      item: productListArray.length,
      total_qty: totalQty,
      total_tax: decimalConverter(totalTax),
      total_price: decimalConverter(totalPrice),
      tax: decimalConverter(orderTax),
      change: decimalConverter(
        Number(values?.recieved_amount ?? 0) - Number(values?.paid_amount ?? 0)
      ),
      grand_total: calculateGrandTotal(totalPrice, orderTax, 0, shipping_cost),

      product_list: JSON.stringify(productListArray),
      petty_cash_id: 8,
      _method: 'PUT',
    };

    if (attachment.length > 0) {
      postObj.attachment = attachment?.[0].originFileObj;
    }

    let deleteAttachmentIds = getMissingUids(fields, values, 'attachment');

    if (deleteAttachmentIds.length > 0) {
      postObj.deleteAttachmentIds = deleteAttachmentIds;
    }

    appendToFormData(postObj, formData);

    const { data, error } = await updateTransfer({
      id,
      data: formData,
    });

    if (data?.success) {
      setId(undefined);
      dispatch(closeEditDrawer());
    }

    if (error) {
      const errorFields = errorFieldsUpdate(fields, error);

      setFields(errorFields);
    }
  };

  return (
    <CustomDrawer
      title={'Edit Transfer'}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <TransferForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
        data={data}
      />
    </CustomDrawer>
  );
};

export default TransferEdit;
