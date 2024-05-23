import { Descriptions, Spin } from "antd";
import { useGetProductDetailsQuery } from "../../redux/services/product/productApi";
import createDetailsLayout from "../../utilities/lib/createDetailsLayout";
import CustomModal from "../Shared/Modal/CustomModal";

const detailsLayout = (data) => {
  return [
    {
      key: 1,
      label: "Name",
      children: data?.name,
      span: 2,
    },
    {
      key: 2,
      label: "SKU",
      children: data?.sku,
      span: 2,
    },
    {
      key: 3,
      label: "Type",
      children: data?.type,
      span: 2,
    },
    {
      key: 4,
      label: "Symbology",
      children: data?.symbology,
      span: 2,
    },
    {
      key: 5,
      label: "Brand ID",
      children: data?.brand_id,
      span: 2,
    },
    {
      key: 6,
      label: "Category ID",
      children: data?.category_id,
      span: 2,
    },
    {
      key: 7,
      label: "Unit ID",
      children: data?.unit_id,
      span: 2,
    },
    {
      key: 8,
      label: "Purchase Unit ID",
      children: data?.purchase_unit_id,
      span: 2,
    },
    {
      key: 9,
      label: "Sale Unit ID",
      children: data?.sale_unit_id,
      span: 2,
    },
    {
      key: 10,
      label: "Buying Price",
      children: data?.buying_price,
      span: 2,
    },
    {
      key: 11,
      label: "Selling Price",
      children: data?.selling_price,
      span: 2,
    },
    {
      key: 12,
      label: "Profit",
      children: data?.profit,
      span: 2,
    },
    {
      key: 13,
      label: "Quantity",
      children: data?.qty,
      span: 2,
    },
    {
      key: 14,
      label: "Alert Quantity",
      children: data?.alert_qty,
      span: 2,
    },
    {
      key: 15,
      label: "Daily Sale Quantity",
      children: data?.daily_sale_qty,
      span: 2,
    },
    {
      key: 16,
      label: "Tax Method",
      children: data?.tax_method,
      span: 2,
    },
    {
      key: 17,
      label: "Tax ID",
      children: data?.tax_id,
      span: 2,
    },
    {
      key: 18,
      label: "Details",
      children: data?.details,
      span: 4,
    },
    {
      key: 19,
      label: "Product List",
      children: (
        <>
          {data?.product_list &&
            JSON.parse(data?.product_list)?.map((item, index) => {
              return <div key={index}>{JSON.stringify(item)}</div>;
            })}
        </>
      ),
      span: 4,
    },
  ];
};

export const ProductDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetProductDetailsQuery({ id }, { skip: !id });

  const details = createDetailsLayout(data);

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="w-full flex justify-center items-center mt-10" />
      ) : (
        <Descriptions title="Product Details" bordered items={details} />
      )}
    </CustomModal>
  );
};
