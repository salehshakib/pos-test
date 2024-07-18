import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { StockRequestDetails } from "./StockRequestDetails";
import { GlobalUtilityStyle } from "../../container/Styled";
import { useReadNotificationMutation } from "../../redux/services/notification/notificationApi";

export const AcceptStockRequest = () => {
  const { state } = useLocation();
  const { id, status } = state;

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [readNotification, { isLoading }] = useReadNotificationMutation();

  const handleReadNotification = async () => {
    if (id && status === "unread") {
      const { data } = await readNotification({ id });

      if (data?.success) {
        hideModal();
      }
    }
  };

  const hideModal = () => {
    setDetailsModal(false);
    setDetailsId(undefined);
  };

  useEffect(() => {
    if (id && !detailsModal) {
      setDetailsId(id);
    }
    if (detailsId) {
      setDetailsModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, detailsModal]);

  console.log(status);

  return (
    detailsId && (
      <GlobalUtilityStyle>
        <StockRequestDetails
          id={detailsId}
          openModal={detailsModal}
          hideModal={hideModal}
          notification={status === "unread" && true}
          showCloseButton={status === "read" ? true : false}
          onOk={handleReadNotification}
          loading={isLoading}
        />
      </GlobalUtilityStyle>
    )
  );
};
