// import { DatePicker, Form } from "antd";
// import { MdDateRange, MdOutlineWatchLater } from "react-icons/md";
// import { GlobalUtilityStyle } from "../../../container/Styled";

// const { RangePicker } = DatePicker;

// const CustomDatepicker = ({
//   label,
//   required,
//   picker,
//   type = "date",
//   name,
//   disabledDate = false,
//   placeholder = "Choose Date",
// }) => {
//   return (
//     <GlobalUtilityStyle>
//       <Form.Item
//         label={label}
//         name={name}
//         rules={[
//           {
//             required: required,
//             message: `Please input ${label ?? placeholder}!`,
//           },
//         ]}
//       >
//         {type === "date" && (
//           <DatePicker
//             size={"large"}
//             placeholder={placeholder}
//             className="border-2 mt-1"
//             style={{ width: "100%" }}
//             format={
//               picker === "year"
//                 ? "YYYY"
//                 : picker === "time"
//                 ? "hh:mm:ss"
//                 : "YYYY-MM-DD"
//             }
//             picker={picker}
//             suffixIcon={
//               picker === "time" ? (
//                 <MdOutlineWatchLater color="black" />
//               ) : (
//                 <MdDateRange color="black" />
//               )
//             }
//             disabledDate={disabledDate}
//           />
//         )}

//         {type === "range" && (
//           <RangePicker
//             picker={picker}
//             size={"large"}
//             className="border-2 mt-1"
//             style={{ width: "100%" }}
//             format={
//               picker === "year"
//                 ? "YYYY"
//                 : picker === "time"
//                 ? "hh:mm:ss"
//                 : "YYYY-MM-DD"
//             }
//             suffixIcon={
//               picker === "time" ? (
//                 <MdOutlineWatchLater color="black" />
//               ) : (
//                 <MdDateRange color="black" />
//               )
//             }
//           />
//         )}
//       </Form.Item>
//     </GlobalUtilityStyle>
//   );
// };

// export default CustomDatepicker;

import { DatePicker, Form, TimePicker } from "antd";
import { MdDateRange, MdOutlineWatchLater } from "react-icons/md";
import { GlobalUtilityStyle } from "../../../container/Styled";

const { RangePicker } = DatePicker;

const CustomDatepicker = ({
  label,
  required,
  picker,
  // range, time, date
  type = "date",
  name,
  disabledDate = false,
  placeholder = "Choose Date",
  onChange,

  //for mb-0
  customStyle = false,
}) => {
  const getFormat = () => {
    switch (picker) {
      case "year":
        return "YYYY";
      case "time":
        return "h:mm:ss A";
      default:
        return "YYYY-MM-DD";
    }
  };

  const getSuffixIcon = () => {
    switch (type) {
      case "time":
        return <MdOutlineWatchLater color="black" />;
      default:
        return <MdDateRange color="black" />;
    }
  };

  const commonProps = {
    size: "large",
    className: "border-2 mt-1",
    style: { width: "100%" },
    format: getFormat(),
    suffixIcon: getSuffixIcon(),
    onChange,
  };

  const renderPicker = () => {
    switch (type) {
      case "date":
        return (
          <DatePicker
            {...commonProps}
            placeholder={placeholder}
            picker={picker}
            disabledDate={disabledDate}
          />
        );
      case "range":
        return (
          <RangePicker
            {...commonProps}
            picker={picker}
            disabledDate={disabledDate}
          />
        );
      case "time":
        return <TimePicker {...commonProps} use12Hours />;
      default:
        return null;
    }
  };

  return (
    <GlobalUtilityStyle>
      <Form.Item
        label={label}
        name={name}
        rules={[
          {
            required,
            message: `Please input ${label ?? placeholder}!`,
          },
        ]}
        className={customStyle && "mb-0"}
      >
        {renderPicker()}
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default CustomDatepicker;
