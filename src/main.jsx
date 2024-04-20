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
  token: {
    // colorPrimary: "#DCBFFF",
    colorPrimary: "#51258F",

    colorPrimaryHover: "#51258F",
    colorBorder: "#DCBFFF",
    colorPrimaryBorder: "#51258F",
  },
  components: {
    Input: {
      hoverBorderColor: "#DCBFFF",
      activeBorderColor: "#51258F",
    },
    Button: {
      //font weight
      fontWeight: 700,

      defaultHoverBg: "#51258F",
      defaultHoverBorderColor: "#51258F",
      defaultHoverColor: "#FFFFFF",
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={theme}
      button={{
        className: "text-secondary",
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
