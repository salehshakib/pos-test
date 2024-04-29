import { notification } from "antd";

export const openNotification = (type, message) => {
  notification[type]({
    message: type === "success" ? "Success" : "Failed",
    description:
      message ?? "No Message is provided. Task Completed Successfully",
  });
};
