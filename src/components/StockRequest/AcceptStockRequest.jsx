import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalUtilityStyle } from "../../container/Styled";
import { useReadNotificationMutation } from "../../redux/services/notification/notificationApi";
import { StockRequestDetails } from "./StockRequestDetails";

export const AcceptStockRequest = () => {
  const { state } = useLocation();
  const { id, status } = state ?? {};

  const navigate = useNavigate();

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
    navigate("/inventory/stock-request", { replace: true });
  };

  useEffect(() => {
    if (id) {
      setDetailsId(id);
      setDetailsModal(true);
    } else {
      setDetailsId(undefined);
    }
  }, [detailsId, id]);

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
