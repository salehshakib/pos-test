import { ConfigProvider } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { router } from "../routes/routes";
import { theme } from "../utilities/configs/theme";
import { ThemeProvider } from "styled-components";

export const ProviderConfig = ({ children }) => {
  var { primaryColor, secondaryColor } = useSelector((state) => state.theme);

  const customTheme = theme(primaryColor, secondaryColor);

  console.log(primaryColor, secondaryColor);

  return (
    <React.StrictMode>
      <ConfigProvider
        theme={customTheme}
        button={
          {
            //   className: `hover:bg-${color}`,
          }
        }
        locale={{
          locale: "en-US",
        }}
      >
        <ThemeProvider theme={{ ...customTheme }}>
          {/* <Provider store={store}>
          <PersistGate persistor={persistor}> */}
          <RouterProvider router={router}>{children}</RouterProvider>
          {/* </PersistGate> */}
          <Toaster position="top-center" richColors />
        </ThemeProvider>

        {/* </Provider> */}
      </ConfigProvider>
    </React.StrictMode>
  );
};
