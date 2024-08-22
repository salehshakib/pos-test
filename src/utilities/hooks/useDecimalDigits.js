import { useSelector } from "react-redux";

export function useDecimalDigits() {
  return useSelector((state) => state.developer.digits);
}
