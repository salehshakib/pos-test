export function theme({ primaryColor, secondaryColor, textColor }) {
  return {
    token: {
      secondaryColor: secondaryColor,

      colorPrimary: primaryColor,
      colorPrimaryHover: primaryColor,
      colorBorder: primaryColor,
      colorPrimaryBorder: primaryColor,
      // colorText: textColor,
    },
    components: {
      Input: {
        activeBorderColor: secondaryColor,
        hoverBorderColor: secondaryColor,
      },

      Button: {
        fontWeight: 700,
        defaultColor: textColor,
        defaultHoverBg: secondaryColor,
        defaultHoverBorderColor: secondaryColor,
        // defaultHoverColor: "#FFFFFF",
      },
      Table: {
        headerBg: primaryColor,
        headerSplitColor: secondaryColor,
        stickyScrollBarBg: primaryColor,
        stickyScrollBarBorderRadius: "0 0 10px 10px",
      },
      Menu: {
        itemHoverBg: primaryColor,
      },
    },
  };
}
