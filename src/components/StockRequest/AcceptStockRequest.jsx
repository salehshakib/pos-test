import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalUtilityStyle } from "../../container/Styled";
import { StockRequestDetails } from "./StockRequestDetails";

export const AcceptStockRequest = () => {
  const { state } = useLocation();
  const { id } = state ?? {};

  const navigate = useNavigate();

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  // const [readNotification, { isLoading }] = useReadNotificationMutation();

  // const handleReadNotification = async () => {
  //   if (id && status === "unread") {
  //     const { data } = await readNotification({ id });

  //     if (data?.success) {
  //       hideModal();
  //     }
  //   }
  // };

  const handleAccept = async () => {
    console.log("accept");
  };

  const handleAcceptAndTransfer = async () => {
    console.log("accept and transfer");

    navigate("/inventory/transfer", {
      state: {
        id: id,
      },
    });
  };

  const handleReject = () => {
    console.log("reject");
  };

  const hideModal = () => {
    setDetailsModal(false);
    setDetailsId(undefined);
    navigate("/inventory/stock-request", { replace: true });
  };

  useEffect(() => {
    if (id) {
      setDetailsId(id);
      setDetailsModal(true);
    } else {
      setDetailsId(undefined);
      setDetailsModal(false);
    }
  }, [id]);

  return (
    detailsId && (
      <GlobalUtilityStyle>
        <StockRequestDetails
          id={detailsId}
          openModal={detailsModal}
          hideModal={hideModal}
          notification={true}
          showCloseButton={false}
          onAccept={handleAccept}
          onAcceptAndTransfer={handleAcceptAndTransfer}
          onReject={handleReject}
          acceptLoading={false}
          acceptAndTransferLoading={false}
        />
      </GlobalUtilityStyle>
    )
  );
};
