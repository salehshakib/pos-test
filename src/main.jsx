import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import { ConfigProvider } from "antd";

import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { router } from "./routes/routes.jsx";

const theme = {
  token: {
    colorPrimary: "#51258F",

    colorPrimaryHover: "#51258F",
    // colorPrimaryHover: "#683fa0",
    colorBorder: "#DCBFFF",
    colorPrimaryBorder: "#51258F",
    // color: "#51258F",
  },
  components: {
    Input: {
      hoverBorderColor: "#DCBFFF",
      activeBorderColor: "#51258F",
    },
    Button: {
      fontWeight: 700,

      defaultColor: "#51258F",

      defaultHoverBg: "#51258F",
      defaultHoverBorderColor: "#51258F",
      defaultHoverColor: "#FFFFFF",
    },
    Table: {
      // headerBg: "#DCBFFF",
      headerBg: "#F2E8FF",
      headerSplitColor: "#51258F",
      stickyScrollBarBg: "#F2E8FF",
      stickyScrollBarBorderRadius: "0 0 10px 10px",
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={theme}
      button={{
        className: "hover:bg-[#5b3196]",
      }}
      locale={{
        locale: "en-US",
      }}
    >
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
