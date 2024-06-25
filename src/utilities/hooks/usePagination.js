import { useSelector } from "react-redux";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";

export const usePagination = () => {
  return useSelector(selectPagination);
};
