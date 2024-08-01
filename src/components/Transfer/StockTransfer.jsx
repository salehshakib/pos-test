import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import { StockTransferForm } from "./StockTransferForm";
import { useGetStockRequestDetailsQuery } from "../../redux/services/stockRequest/stockRequestApi";

export const StockTransfer = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [stockTransferId, setStockTransferId] = useState(state?.id);
  const [stockTransferDrawer, setStockTransferDrawer] = useState(!!state?.id);

  const { data, isFetching } = useGetStockRequestDetailsQuery(
    {
      id: stockTransferId,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !stockTransferId }
  );

  console.log(data);

  const hideDrawer = () => {
    setStockTransferDrawer(false);
    setStockTransferId(undefined);
    navigate("/inventory/transfer", { replace: true });
  };

  useEffect(() => {
    if (state?.id) {
      setStockTransferId(state.id);
      setStockTransferDrawer(true);
    } else {
      setStockTransferId(undefined);
      setStockTransferDrawer(false);
    }
  }, [state?.id]);

  return (
    <CustomDrawer
      title={"Stock Transfer"}
      open={stockTransferDrawer}
      width={1400}
      onClose={hideDrawer}
      isLoading={isFetching}
    >
      <StockTransferForm />
    </CustomDrawer>
  );
};
