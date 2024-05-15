import { Descriptions } from "antd";
import { useGetAdjustmentDetailsQuery } from "../../redux/services/adjustment/adjustmentApi";
import CustomModal from "../Shared/Modal/CustomModal";

const items = [
  {
    label: "Product",
    children: "Cloud Database",
  },
  {
    label: "Billing",
    children: "Prepaid",
  },
  {
    label: "Time",
    children: "18:00:00",
  },
  {
    label: "Amount",
    children: "$80.00",
  },
  {
    label: "Discount",
    span: {
      xl: 2,
      xxl: 2,
    },
    children: "$20.00",
  },
  {
    label: "Official",
    span: {
      xl: 2,
      xxl: 2,
    },
    children: "$60.00",
  },
  {
    label: "Config Info",
    span: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 2,
      xxl: 2,
    },
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
      </>
    ),
  },
  {
    label: "Hardware Info",
    span: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 2,
      xxl: 2,
    },
    children: (
      <>
        CPU: 6 Core 3.5 GHz
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
      </>
    ),
  },
];

const AdjustmentDetails = ({ id, ...props }) => {
  const { data } = useGetAdjustmentDetailsQuery({ id }, { skip: !id });

  if (!data) return null;

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
          {JSON.parse(data?.product_list)?.map((item, index) => {
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
      <Descriptions title="Adjustment Details" bordered items={details} />
    </CustomModal>
  );
};

export default AdjustmentDetails;
