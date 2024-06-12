import { Spin } from "antd";
import { useGetInvoiceDetailsQuery } from "../../../../redux/services/invoice/invoiceApi";
import createDetailsLayout from "../../../../utilities/lib/createDetailsLayout";
import { CustomDescription } from "../../../Shared/Description/CustomDescription";
import CustomModal from "../../../Shared/Modal/CustomModal";

export const InvoiceDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetInvoiceDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );

  const details = createDetailsLayout(data);

  console.log(details);

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="w-full flex justify-center items-center mt-10" />
      ) : (
        <CustomDescription title="Invoice Details" items={details} />
      )}
    </CustomModal>
  );
};
