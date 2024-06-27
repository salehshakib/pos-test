import { App, ConfigProvider } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "styled-components";
import { useGetGeneralSettingsQuery } from "../redux/services/settings/generalSettings/generalSettingsApi";
import {
  setPrimaryColor,
  setSecondaryColor,
} from "../redux/services/theme/themeSlice";
import { router } from "../routes/routes";
import { theme } from "../utilities/configs/theme";

export const ProviderConfig = ({ children }) => {
  const dispatch = useDispatch();

  const { primaryColor, secondaryColor, textColor } = useSelector(
    (state) => state.theme
  );

  const { data } = useGetGeneralSettingsQuery();

  useEffect(() => {
    if (data) {
      dispatch(setPrimaryColor(data.primary_color));
      dispatch(setSecondaryColor(data.secendary_color));

      document.documentElement.style.setProperty(
        "--firstColor",
        data?.primary_color ? data?.primary_color : "#842577"
      );
      document.documentElement.style.setProperty(
        "--secondColor",
        data?.secendary_color ? data?.secendary_color : "#B391AC"
      );
    }
  }, [data, dispatch]);

  const customTheme = theme({ primaryColor, secondaryColor, textColor });

  return (
    <React.StrictMode>
      <ConfigProvider
        theme={customTheme}
        locale={{
          locale: "en-US",
        }}
      >
        {/* styled components */}
        <App>
          <ThemeProvider theme={{ ...customTheme }}>
            <RouterProvider router={router}>{children}</RouterProvider>
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </App>
      </ConfigProvider>
    </React.StrictMode>
  );
};
