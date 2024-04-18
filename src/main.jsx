import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import App from "./App.jsx";
import "./index.css";
import { persistor, store } from "./redux/store.js";
import { router } from "./routes/routes.jsx";

const theme = {
  components: {
    Input: {
      hoverBorderColor: "#DCBFFF",
      activeBorderColor: "#51258F",
    },
    Button: {
      // colorPrimary: "#DCBFFF",
      // colorText: "#FFFFFF",
      // colorBg: "#DCBFFF",
      // groupBorderColor: "#51258F",
      // primaryColor: "#51258F",
    },
  },
  token: {
    colorPrimary: "#DCBFFF",
    colorPrimaryHover: "#51258F",
    colorBorder: "#DCBFFF",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </PersistGate>
        <Toaster position="top-center" richColors />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
