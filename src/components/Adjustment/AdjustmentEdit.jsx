import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAdjustmentDetailsQuery,
  useUpdateAdjustmentMutation,
} from "../../redux/services/adjustment/adjustmentApi";
import { closeEditDrawer } from "../../redux/services/drawer/drawerSlice";
import { appendToFormData } from "../../utilities/lib/appendFormData";
import { errorFieldsUpdate } from "../../utilities/lib/errorFieldsUpdate";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import AdjustmentForm from "./AdjustmentForm";

const AdjustmentEdit = ({ id, setId }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  console.log(id);

  const { data, isFetching } = useGetAdjustmentDetailsQuery(
    { id },
    { skip: !id }
  );

  const [udpateAdjustment, { isLoading }] = useUpdateAdjustmentMutation();

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (data) {
      const product_list = JSON.parse(data?.product_list);

      const list = product_list?.map((item) => item);

      const fieldData = [
        {
          name: "warehouse_id",
          value: data?.warehouse_id,
          errors: "",
        },
        {
          name: "product_name",
          value: list?.map((item) => item?.product_id.toString()),
          errors: "",
        },
        {
          name: "attachment",
          value: [
            {
              url: data?.attachments?.[0]?.url,
            },
          ],
          errors: "",
        },
        {
          name: "note",
          value: data?.note,
          errors: "",
        },
        ...list.map((item) => {
          return {
            name: ["product_list", "action", `${item?.product_id.toString()}`],
            value: item?.action,
            errors: "",
          };
        }),
        ...list.map((item) => {
          return {
            name: ["product_list", "qty", `${item?.product_id.toString()}`],
            value: item?.qty,
            errors: "",
          };
        }),
      ];

      setOptions(
        list?.map((item) => {
          return {
            value: item?.product_id.toString(),
            label: `Product ${item?.product_id}`,
          };
        })
      );

      setFields(fieldData);
    }
  }, [data, setFields]);

  const handleUpdate = async (values) => {
    const { product_list, attachment, note, warehouse_id } = values;

    const formData = new FormData();

    const productListArray = Object.keys(product_list.qty).map((product_id) => {
      return {
        product_id: parseInt(product_id),
        qty: product_list.qty[product_id],
        action: product_list.action[product_id],
      };
    });

    // attachment[0]?.originFileObj;
    const postObj = {
      attachment:
        attachment?.length > 0
          ? attachment?.map((file) => file.originFileObj)
          : [],
      warehouse_id: warehouse_id,
      product_list: JSON.stringify(productListArray),
      note,
    };

    appendToFormData(postObj, formData);

    const { data, error } = await udpateAdjustment({ id, formData });

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
      title={"Edit Adjustment"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <AdjustmentForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        options={options}
      />
    </CustomDrawer>
  );
};

export default AdjustmentEdit;
