import { Spin } from "antd";
import { useGetQuotationDetailsQuery } from "../../../../redux/services/quotation/quotationApi";
import createDetailsLayout from "../../../../utilities/lib/createDetailsLayout";
import { CustomDescription } from "../../../Shared/Description/CustomDescription";
import CustomModal from "../../../Shared/Modal/CustomModal";

export const QuotationDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetQuotationDetailsQuery(
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
        // <></>
        <CustomDescription title="Quotation Details" items={details} />
      )}
    </CustomModal>
  );
};
