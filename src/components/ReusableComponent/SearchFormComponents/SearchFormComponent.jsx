import { Col } from "antd";
import { mdColLayout } from "../../../layout/FormLayout";
import { useGetBrandsQuery } from "../../../redux/services/brand/brandApi";
import { useGetWarehousesQuery } from "../../../redux/services/warehouse/warehouseApi";
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from "../../../utilities/hooks/useParams";
import CustomSelect from "../../Shared/Select/CustomSelect";
import { useGetAllCategoryQuery } from "../../../redux/services/category/categoryApi";
import { useGetAllSupplierQuery } from "../../../redux/services/supplier/supplierApi";
import { useGetAllProductsQuery } from "../../../redux/services/product/productApi";
import { useGetAllCashierQuery } from "../../../redux/services/cashier/cashierApi";
import { useGetAllTaxQuery } from "../../../redux/services/tax/taxApi";
import { useGetAllCustomerQuery } from "../../../redux/services/customer/customerApi";
import { useGetAllGiftCardTypeQuery } from "../../../redux/services/giftcard/giftcardtype/giftCardTypeApi";
import { useGetAllDesignationQuery } from "../../../redux/services/hrm/designation/designationApi";

const commonProps = {
  showSearch: true,
  mode: "multiple",
};

export const WarehouseFilter = () => {
  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetWarehousesQuery({ params });

  const options = data?.results?.warehouse?.map((item) => ({
    value: item?.id?.toString(),
    label: item?.name,
  }));

  return (
    <Col {...mdColLayout}>
      <CustomSelect
        {...commonProps}
        label={"Warehouse"}
        name={"warehouse_ids"}
        options={options}
        isLoading={isLoading}
      />
    </Col>
  );
};

export const BrandFilter = () => {
  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetBrandsQuery({ params });

  const options = data?.results?.brand?.map((item) => {
    return {
      value: item?.id.toString(),
      label: item?.name,
    };
  });

  return (
    <Col {...mdColLayout}>
      <CustomSelect
        {...commonProps}
        label="Brand"
        name={"brand_ids"}
        options={options}
        isLoading={isLoading}
      />
    </Col>
  );
};

export const CategoryFilter = () => {
  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetAllCategoryQuery({ params });

  const options = data?.results?.category?.map((item) => {
    return {
      value: item?.id?.toString(),
      label: item?.name,
    };
  });

  return (
    <Col {...mdColLayout}>
      <CustomSelect
        {...commonProps}
        label="Category"
        name={"category_ids"}
        options={options}
        isLoading={isLoading}
      />
    </Col>
  );
};

export const SupplierFilter = () => {
  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetAllSupplierQuery({ params });

  const options = data?.results?.supplier?.map((item) => ({
    value: item?.id?.toString(),
    label: item?.name,
  }));

  return (
    <Col {...mdColLayout}>
      <CustomSelect
        {...commonProps}
        label="Supplier"
        name={"supplier_ids"}
        options={options}
        isLoading={isLoading}
      />
    </Col>
  );
};

export const ProductFilter = () => {
  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetAllProductsQuery({ params });

  const options = data?.results?.product?.map((item) => ({
    value: item?.id?.toString(),
    label: item?.name,
  }));

  return (
    <Col {...mdColLayout}>
      <CustomSelect
        {...commonProps}
        label="Product"
        name={"product_ids"}
        options={options}
        isLoading={isLoading}
      />
    </Col>
  );
};

export const CashierFilter = () => {
  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetAllCashierQuery({ params });

  const options = data?.results?.cashier?.map((item) => ({
    value: item?.id?.toString(),
    label: item?.name,
  }));

  return (
    <Col {...mdColLayout}>
      <CustomSelect
        {...commonProps}
        label="Cashier"
        name={"cashier_ids"}
        options={options}
        isLoading={isLoading}
      />
    </Col>
  );
};

export const TaxFilter = () => {
  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetAllTaxQuery({ params });

  const options = data?.results?.tax?.map((item) => {
    return {
      value: item.id.toString(),
      label: item.name,
    };
  });

  return (
    <Col {...mdColLayout}>
      <CustomSelect
        {...commonProps}
        label="Tax"
        name={"tax_ids"}
        options={options}
        isLoading={isLoading}
      />
    </Col>
  );
};

export const CustomerFilter = () => {
  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetAllCustomerQuery({ params });

  const options = data?.results?.customer?.map((item) => {
    return {
      value: item.id.toString(),
      label: item.name,
    };
  });

  return (
    <Col {...mdColLayout}>
      <CustomSelect
        {...commonProps}
        label="Customer"
        name={"customer_ids"}
        options={options}
        isLoading={isLoading}
      />
    </Col>
  );
};

export const GiftCardTypeFilter = () => {
  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetAllGiftCardTypeQuery({ params });

  const options = data?.results?.giftcardtype?.map((item) => {
    return {
      value: item.id.toString(),
      label: item.name,
    };
  });

  return (
    <Col {...mdColLayout}>
      <CustomSelect
        {...commonProps}
        label="Card Type"
        name={"gift_card_type_ids"}
        options={options}
        isLoading={isLoading}
      />
    </Col>
  );
};

export const CouponTypeFilter = () => {
  const options = [
    {
      value: "Percentage",
      label: "Percentage",
    },
    {
      value: "Fixed",
      label: "Fixed",
    },
  ];

  return (
    <Col {...mdColLayout}>
      <CustomSelect
        {...commonProps}
        label="Coupon Type"
        name={"types"}
        options={options}
      />
    </Col>
  );
};

export const DesignationFilter = () => {
  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetAllDesignationQuery({ params });

  const options = data?.results?.designation?.map((item) => ({
    value: item?.id?.toString(),
    label: item?.name,
  }));

  return (
    <Col {...mdColLayout}>
      <CustomSelect
        {...commonProps}
        label="Designation"
        name={"designation_ids"}
        options={options}
        isLoading={isLoading}
      />
    </Col>
  );
};
// export const GiftCardTypeFilter = () => {
//     const params = useGlobalParams({
//       selectValue: DEFAULT_SELECT_VALUES,
//     });

//     const { data, isLoading } = useGetAllGiftCardTypeQuery({ params });

//     const options = data?.results?.giftcardtype?.map((item) => {
//       return {
//         value: item.id.toString(),
//         label: item.name,
//       };
//     });

//     return (
//       <Col {...mdColLayout}>
//         <CustomSelect
//           {...commonProps}
//           label="Card Type"
//           name={"gift_card_type_ids"}
//           options={options}
//           isLoading={isLoading}
//         />
//       </Col>
//     );
//   };
// export const GiftCardTypeFilter = () => {
//     const params = useGlobalParams({
//       selectValue: DEFAULT_SELECT_VALUES,
//     });

//     const { data, isLoading } = useGetAllGiftCardTypeQuery({ params });

//     const options = data?.results?.giftcardtype?.map((item) => {
//       return {
//         value: item.id.toString(),
//         label: item.name,
//       };
//     });

//     return (
//       <Col {...mdColLayout}>
//         <CustomSelect
//           {...commonProps}
//           label="Card Type"
//           name={"gift_card_type_ids"}
//           options={options}
//           isLoading={isLoading}
//         />
//       </Col>
//     );
//   };
