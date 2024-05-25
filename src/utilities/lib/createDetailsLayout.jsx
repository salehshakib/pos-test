import { Badge } from "antd";

const createDetailsLayout = (data) => {
  const ignoredKeys = ["id", "created_at", "updated_at", "deleted_at"];

  const fullRowKeys = ["details", "product_list", "address", "qty_list"];

  const details = Object.entries(data ?? {}).reduce(
    (acc, [key, value], index) => {
      if (!ignoredKeys.includes(key)) {
        const detail = {
          key: index + 1,
          label: key.replace(/_/g, " ").toUpperCase(),
          children:
            key === "is_active" ? (
              value === "1" ? (
                <Badge status="success" text="Active" />
              ) : (
                <Badge status="default" text="Inactive" />
              )
            ) : value === "1" ? (
              "True"
            ) : value === "0" ? (
              "False"
            ) : value ? (
              value
            ) : (
              "N/A"
            ),
          span: fullRowKeys.includes(key) ? 4 : 2,
        };
        acc.push(detail);
      }
      return acc;
    },
    []
  );

  if (details.some((item) => item.label === "PRODUCT LIST")) {
    details.find((item) => item.label === "PRODUCT LIST").children = (
      <>
        {data?.product_list &&
          JSON.parse(data?.product_list)?.map((item, index) => {
            return <div key={index}>{JSON.stringify(item)}</div>;
          })}
      </>
    );
  }

  return details;
};

export default createDetailsLayout;
