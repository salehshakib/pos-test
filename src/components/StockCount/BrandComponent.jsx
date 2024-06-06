import { Col } from "antd";
import { useGetBrandsQuery } from "../../redux/services/brand/brandApi";
import { mdColLayout } from "../../layout/FormLayout";
import CustomSelect from "../Shared/Select/CustomSelect";

export const BrandComponent = () => {
  const { data, isFetching } = useGetBrandsQuery({});

  const options = data?.results?.brand?.map((item) => {
    return {
      value: item?.id.toString(),
      label: item?.name,
    };
  });

  return (
    <Col {...mdColLayout}>
      <CustomSelect
        name={"brand_ids"}
        label="Brand"
        options={options}
        isLoading={isFetching}
        mode="multiple"
      />
    </Col>
  );
};
