export function theme(primaryColor = "#51258F", secondaryColor = "#F2E8FF") {
  return {
    token: {
      secondaryColor: secondaryColor || "#F2E8FF",
      colorPrimary: primaryColor || "#51258F",
      colorPrimaryHover: primaryColor || "#51258F",
      colorBorder: secondaryColor || "#DCBFFF",
      colorPrimaryBorder: primaryColor || "#51258F",
    },
    components: {
      Input: {
        activeBorderColor: primaryColor || "#51258F",
      },
      Select: {
        activeBorderColor: primaryColor || "#51258F",
      },
      Button: {
        fontWeight: 700,
        defaultColor: primaryColor || "#51258F",
        defaultHoverBg: primaryColor || "#51258F",
        defaultHoverBorderColor: primaryColor || "#51258F",
        defaultHoverColor: "#FFFFFF",
      },
      Table: {
        headerBg: secondaryColor || "#F2E8FF",
        headerSplitColor: primaryColor || "#51258F",
        stickyScrollBarBg: secondaryColor || "#F2E8FF",
        stickyScrollBarBorderRadius: "0 0 10px 10px",
      },
      Menu: {
        itemHoverBg: secondaryColor || "#F2E8FF",
      },
    },
  };
}
