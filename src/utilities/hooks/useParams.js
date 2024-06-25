import { useMemo } from "react";
import { usePagination } from "./usePagination";

const RELATIONAL_PARAMS = {
  parent: 1,
  child: 1,
};

const DEFAULT_PARAMS = {
  is_active: 1,
};

export const DEFAULT_SELECT_VALUES = ["id", "name"];

export const useGlobalParams = ({
  isPagination = false,
  isDefaultParams = true,
  isRelationalParams = false,
  params = {},
  selectValue = [],
  keyword,
}) => {
  const pagination = usePagination();

  const globalParams = useMemo(() => {
    const updatedParams = {};

    if (params) {
      updatedParams.params = { ...params };
    }

    if (isPagination) {
      updatedParams.pagination = { ...pagination };
    }

    if (isDefaultParams) {
      updatedParams.defaultParams = { ...DEFAULT_PARAMS };
    }

    if (isRelationalParams) {
      updatedParams.relationalParams = { ...RELATIONAL_PARAMS };
    }

    if (selectValue?.length > 0) {
      updatedParams.selectValue = { selectValue };
    }

    if (keyword) {
      updatedParams.keyword = { keyword };
    }

    return updatedParams;
  }, [
    isPagination,
    isDefaultParams,
    isRelationalParams,
    params,
    pagination,
    selectValue,
    keyword,
  ]);

  console.log(globalParams);

  return {
    ...globalParams.pagination,
    ...globalParams.defaultParams,
    ...globalParams.relationalParams,
    ...globalParams.selectValue,
    ...globalParams.params,
    ...globalParams.keyword,
  };
};
