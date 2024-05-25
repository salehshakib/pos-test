import { Spin } from "antd";
import { useGetAdjustmentDetailsQuery } from "../../redux/services/adjustment/adjustmentApi";
import { CustomDescription } from "../Shared/Description/CustomDescription";
import CustomModal from "../Shared/Modal/CustomModal";

const AdjustmentDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetAdjustmentDetailsQuery(
    { id },
    { skip: !id }
  );

  const details = [
    {
      key: 1,
      label: "Warehouse Name",
      children: data?.warehouse_id,
      span: 2,
    },

    {
      key: 2,
      label: "Reference ID",
      children: data?.reference_id,
      span: 2,
    },
    {
      key: 3,
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
    {
      key: 4,
      label: "Note",
      children: data?.note ?? "N/A",
      span: 4,
    },
  ];

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="w-full flex justify-center items-center mt-10" />
      ) : (
        <CustomDescription title="Adjustment Details" items={details} />
      )}
    </CustomModal>
  );
};

export default AdjustmentDetails;
