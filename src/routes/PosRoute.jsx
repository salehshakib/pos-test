import { App } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  logout,
  useCurrentToken,
  useCurrentUser,
} from "../redux/services/auth/authSlice";
import { useCheckPettyCashQuery } from "../redux/services/pettycash/pettyCashApi";
import { setPettyCash } from "../redux/services/pettycash/pettyCashSlice";
import { openNotification } from "../utilities/lib/openToaster";

function PosRoute({ children }) {
  const token = useSelector(useCurrentToken);
  const dispatch = useDispatch();

  const { message } = App.useApp();
  const user = useSelector(useCurrentUser);
  const navigate = useNavigate();

  const warehouseId = user?.warehouse_id;

  const { data } = useCheckPettyCashQuery(
    {
      params: {
        warehouse_id: parseInt(warehouseId),
      },
    },
    {
      skip: !warehouseId,
    }
  );

  useEffect(() => {
    if (data?.data === "Close") {
      dispatch(setPettyCash({ data: data?.data }));

      openNotification(
        "warning",
        "No cash register found. Open a new cash register"
      );

      return <Navigate to={"/dashboard"} replace={true} />;
    }
  }, [data, dispatch, message, navigate]);

  if (!token) {
    dispatch(logout());
    return <Navigate to={"/login"} replace={true} />;
  }

  return children;
}

export default PosRoute;
