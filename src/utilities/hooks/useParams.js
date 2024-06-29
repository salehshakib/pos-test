// import { useMemo } from "react";
// import { usePagination } from "./usePagination";

// const RELATIONAL_PARAMS = {
//   parent: 1,
//   child: 1,
// };

// const DEFAULT_PARAMS = {
//   is_active: 1,
// };

// export const DEFAULT_SELECT_VALUES = ["id", "name"];

// export const useGlobalParams = ({
//   isPagination = false,
//   isDefaultParams = true,
//   isRelationalParams = false,
//   params = {},
//   selectValue = [],
//   keyword,
// }) => {
//   const pagination = usePagination();

//   console.log(pagination);

//   const globalParams = useMemo(() => {
//     const updatedParams = {};

//     if (params) {
//       updatedParams.params = { ...params };
//     }

//     // if (isPagination) {
//     //   updatedParams.pagination = {
//     //     page: pagination.page,
//     //     perPage: pagination.perPage,
//     //     allData: 1,
//     //   };
//     // }

//     if (isDefaultParams) {
//       updatedParams.defaultParams = { ...DEFAULT_PARAMS };
//     }

//     if (isRelationalParams) {
//       updatedParams.relationalParams = { ...RELATIONAL_PARAMS };
//     }

//     if (selectValue?.length > 0) {
//       updatedParams.selectValue = { selectValue };
//     }

//     if (keyword) {
//       updatedParams.keyword = { keyword };
//     }

//     return updatedParams;
//   }, [
//     // isPagination,
//     isDefaultParams,
//     isRelationalParams,
//     params,
//     // pagination,
//     selectValue,
//     keyword,
//   ]);

//   //console.log(globalParams);

//   return {
//     // ...globalParams.pagination,
//     ...globalParams.defaultParams,
//     ...globalParams.relationalParams,
//     ...globalParams.selectValue,
//     ...globalParams.params,
//     ...globalParams.keyword,
//   };
// };

import { useMemo } from "react";

const RELATIONAL_PARAMS = {
  parent: 1,
  child: 1,
};

const DEFAULT_PARAMS = {
  is_active: 1,
};

export const DEFAULT_SELECT_VALUES = ["id", "name"];

export const useGlobalParams = ({
  isDefaultParams = true,
  isRelationalParams = false,
  params = {},
  selectValue = [],
  keyword,
}) => {
  const globalParams = useMemo(() => {
    let updatedParams = { ...params };

    if (isDefaultParams) {
      updatedParams = { ...updatedParams, ...DEFAULT_PARAMS };
    }

    if (isRelationalParams) {
      updatedParams = { ...updatedParams, ...RELATIONAL_PARAMS };
    }

    if (selectValue?.length > 0) {
      updatedParams.selectValue = selectValue;
    }

    if (keyword) {
      updatedParams.keyword = keyword;
    }

    return updatedParams;
  }, [isDefaultParams, isRelationalParams, params, selectValue, keyword]);

  return globalParams;
};
