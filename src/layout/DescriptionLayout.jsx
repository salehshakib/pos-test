export const desLayout = ({ isMobile }) => {
  return {
    bordered: true,
    labelStyle: {
      width: isMobile ? "40%" : "25%",
    },
    contentStyle: {
      width: isMobile ? "60%" : "25%",
    },
    size: "middle",
    column: { sm: 2, lg: 4 },
  };
};

export const detailsLayout = {
  bordered: true,
  size: "middle",
  labelStyle: {
    width: "25%",
  },
  contentStyle: {
    width: "75%",
  },
  column: { sm: 2, lg: 4 },
};
