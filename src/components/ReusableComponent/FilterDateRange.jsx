import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";

export const FilterDateRange = () => {
  // const
  return (
    <CustomDatepicker
      //   label={"Date"}
      name={"searchDate"}
      type={"range"}
      placeholder="Choose Date"
      presets={true}
    />
  );
};
