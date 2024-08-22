import { useSelector } from "react-redux";

export function useFormatDate() {
  return useSelector((state) => state.developer.dateFormat);
}
