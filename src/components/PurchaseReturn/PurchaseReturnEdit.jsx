import { Form } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useGetPurchaseReturnDetailsQuery,
  useUpdatePurchaseReturnMutation,
} from '../../redux/services/return/purchaseReturnApi';
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
import { updateProductList } from '../../utilities/lib/return/updateProductList';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import { PurchaseReturnForm } from './PurchaseReturnForm';

const PurchaseReturnEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetPurchaseReturnDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );

  const [updatePurchaseReturn, { isLoading }] =
    useUpdatePurchaseReturnMutation();

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      const fieldData = fieldsToUpdate(data);
      setFields(fieldData);
    } else {
      setFields([]);
    }
  }, [data, isEditDrawerOpen, setFields]);

  const handleUpdate = async (values, { purchaseData, formValues }) => {
    const updatedList = updateProductList(values, formValues.product_list);

    const formData = new FormData();

    const productListArray = updatedList?.qty
      ? Object.keys(updatedList.qty)
          .filter((product_id) => updatedList.qty[product_id] !== undefined)
          .map((product_id) => ({
            product_variant_id: parseInt(product_id),
            qty: updatedList.qty[product_id],
            purchase_unit_id: updatedList.purchase_unit_id[product_id],
            net_unit_cost: decimalConverter(
              updatedList.net_unit_cost[product_id]
            ),
            discount: decimalConverter(updatedList.discount[product_id]),
            tax_rate: decimalConverter(updatedList.tax_rate[product_id]),
            tax: decimalConverter(updatedList.tax[product_id]),
            total: decimalConverter(updatedList.total[product_id]),
          }))
      : [];

    if (productListArray.length === 0) {
      openNotification('info', 'Please select atleast one product');
      return;
    }

    const totalPrice = calculateTotalPrice(updatedList);
    const orderTax = calculateTotalTax(
      totalPrice,
      values.tax_rate,
      values?.discount
    );

    const totalQty =
      Object.values(updatedList?.qty).reduce(
        (acc, cur) => acc + parseInt(cur),
        0
      ) ?? 0;

    const totalTax =
      Object.values(updatedList?.tax).reduce(
        (acc, cur) => acc + parseFloat(cur),
        0
      ) ?? 0;

    const grandTotal = calculateGrandTotal(totalPrice, values.tax_rate);

    const postData = {
      purchase_return_at: dayjs(values?.purchase_return_at).format(
        'YYYY-MM-DD'
      ),
      purchase_id: purchaseData?.id,
      petty_cash_id: purchaseData?.petty_cash_id,
      warehouse_id: purchaseData?.warehouse_id,
      cashier_id: purchaseData?.cashier_id,
      item: productListArray?.length,
      total_qty: decimalConverter(totalQty),
      total_tax: decimalConverter(totalTax),
      total_price: decimalConverter(totalPrice),
      tax_rate: decimalConverter(values?.tax_rate),
      tax: decimalConverter(orderTax),
      grand_total: grandTotal,
      return_payment_type: values?.payment_type,
      return_amount: decimalConverter(totalPrice),
      return_note: values?.return_note,
      staff_note: values?.staff_note,
      product_list: JSON.stringify(productListArray),
      _method: 'PUT',
    };

    const { attachment } = values;

    if (attachment?.length > 0) {
      postData.attachment = attachment?.[0].originFileObj;
    }

    let deleteAttachmentIds = getMissingUids(fields, values, 'attachment');

    if (deleteAttachmentIds?.length > 0) {
      postData.deleteAttachmentIds = deleteAttachmentIds;
    }

    appendToFormData(postData, formData);

    const { data, error } = await updatePurchaseReturn({
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
      title={'Edit Purchase Return'}
      open={isEditDrawerOpen}
      width={1400}
      isLoading={isFetching}
    >
      <PurchaseReturnForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
        data={data}
      />
    </CustomDrawer>
  );
};

export default PurchaseReturnEdit;
