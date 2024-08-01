import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalUtilityStyle } from "../../container/Styled";
import { StockRequestDetails } from "./StockRequestDetails";
import { useResponseStockRequestMutation } from "../../redux/services/stockRequest/stockRequestApi";

export const AcceptStockRequest = () => {
  const { state } = useLocation();
  const { id } = state ?? {};

  const navigate = useNavigate();

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [responseStockRequest, { isLoading }] =
    useResponseStockRequestMutation();

  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [acceptAndTransferLoading, setAcceptAndTransferLoading] =
    useState(false);

  const handleAccept = async () => {
    setAcceptLoading(true);
    const { data } = await responseStockRequest({
      request_id: id,
      status: "Accepted",
    });

    if (data?.success) {
      hideModal();
    }

    setAcceptLoading(false);
  };

  const handleAcceptAndTransfer = async () => {
    setAcceptAndTransferLoading(true);

    const { data } = await responseStockRequest({
      request_id: id,
      status: "Accepted",
    });

    setAcceptAndTransferLoading(false);

    if (data?.success) {
      hideModal();

      navigate("/inventory/transfer", {
        state: {
          id: id,
        },
      });
    }
  };

  const handleReject = async () => {
    setRejectLoading(true);
    const { data } = await responseStockRequest({
      request_id: id,
      status: "Rejected",
    });

    if (data?.success) {
      hideModal();
    }

    setRejectLoading(false);
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
          acceptLoading={acceptLoading}
          rejectLoading={rejectLoading}
          acceptAndTransferLoading={acceptAndTransferLoading}
        />
      </GlobalUtilityStyle>
    )
  );
};
