import { Badge } from "antd";
import dayjs from "dayjs";
import parse from "html-react-parser";

const createDetailsLayout = (data) => {
  const ignoredKeys = [
    "id",
    "created_at",
    "updated_at",
    "deleted_at",
    // "attachments",
  ];
  const fullRowKeys = ["details", "product_list", "address", "qty_list"];

  console.log(data);

  const details = Object.entries(data ?? {}).reduce(
    (acc, [key, value], index) => {
      if (!ignoredKeys.includes(key)) {
        let children;

        if (key === "is_active") {
          children =
            value === "1" ? (
              <Badge status="success" text="Active" />
            ) : (
              <Badge status="default" text="Inactive" />
            );
        } else if (key.includes("status")) {
          children =
            value.toLowerCase() === "pending" ? (
              <Badge status="warning" text={value} />
            ) : (
              <Badge status="success" text={value} />
            );
        } else if (key.includes("date")) {
          children = dayjs(value).format("DD-MM-YYYY");
        } else if (value === "1") {
          children = "True";
        } else if (value === "0") {
          children = "False";
        } else if (key === "details") {
          children = value ? <div>{parse(value)}</div> : "N/A";
        } else if (key === "attachments") {
          children = Array.isArray(value)
            ? value.map(({ label, url }) => (
                <img src={url} alt={label} key={url} />
              ))
            : "N/A";
        } else if (typeof value !== "object") {
          children = value ? value : "N/A";
        }

        const item = {
          key: index + 1,
          label: key.replace(/_/g, " ").toUpperCase(),
          children,
          span: fullRowKeys.includes(key) ? 4 : 2,
        };

        acc.push(item);
      }
      return acc;
    },
    []
  );

  if (details.some((item) => item.label === "PRODUCT LIST")) {
    const productListItem = details.find(
      (item) => item.label === "PRODUCT LIST"
    );
    if (data?.product_list) {
      try {
        const productList = JSON.parse(data.product_list);
        productListItem.children = (
          <>
            {productList.map((item, index) => (
              <div key={index}>{JSON.stringify(item)}</div>
            ))}
          </>
        );
      } catch (error) {
        console.error("Error parsing product_list JSON:", error);
        productListItem.children = "Invalid product list data";
      }
    }
  }

  return details;
};

export default createDetailsLayout;

// import { Badge } from "antd";
// import dayjs from "dayjs";
// import parse from "html-react-parser";

// const createDetailsLayout = (data) => {
//   const ignoredKeys = ["id", "created_at", "updated_at", "deleted_at"];
//   const fullRowKeys = ["details", "product_list", "address", "qty_list"];

//   const processValue = (key, value) => {
//     if (key === "is_active") {
//       return value === "1" ? (
//         <Badge status="success" text="Active" />
//       ) : (
//         <Badge status="default" text="Inactive" />
//       );
//     } else if (key.includes("status")) {
//       return value.toLowerCase() === "pending" ? (
//         <Badge status="warning" text={value} />
//       ) : (
//         <Badge status="success" text={value} />
//       );
//     } else if (
//       key.includes("date") ||
//       key === "created_at" ||
//       key === "updated_at"
//     ) {
//       return dayjs(value).format("DD-MM-YYYY");
//     } else if (value === "1") {
//       return "True";
//     } else if (value === "0") {
//       return "False";
//     } else if (key === "details") {
//       return value ? <div>{parse(value)}</div> : "N/A";
//     } else if (Array.isArray(value)) {
//       return value.length > 0
//         ? value.map((item, index) => (
//             <div key={index}>{JSON.stringify(item)}</div>
//           ))
//         : "N/A";
//     } else if (typeof value === "object" && value !== null) {
//       return createDetailsLayout(value);
//     } else {
//       return value ? value : "N/A";
//     }
//   };

//   const details = Object.entries(data ?? {}).reduce(
//     (acc, [key, value], index) => {
//       if (!ignoredKeys.includes(key)) {
//         const item = (
//           <div
//             key={index}
//             style={{
//               gridColumn: fullRowKeys.includes(key) ? "span 4" : "span 2",
//             }}
//           >
//             <strong>{key.replace(/_/g, " ").toUpperCase()}</strong>:{" "}
//             {processValue(key, value)}
//           </div>
//         );

//         acc.push(item);
//       }
//       return acc;
//     },
//     []
//   );

//   if (details.some((item) => item.props.children[0] === "PRODUCT LIST")) {
//     const productListItem = details.find(
//       (item) => item.props.children[0] === "PRODUCT LIST"
//     );
//     if (data?.product_list) {
//       try {
//         const productList = JSON.parse(data.product_list);
//         productListItem.props.children[1] = (
//           <div>
//             {productList.map((item, index) => (
//               <div key={index}>{JSON.stringify(item)}</div>
//             ))}
//           </div>
//         );
//       } catch (error) {
//         console.error("Error parsing product_list JSON:", error);
//         productListItem.props.children[1] = "Invalid product list data";
//       }
//     }
//   }

//   return details;
// };

// export default createDetailsLayout;
