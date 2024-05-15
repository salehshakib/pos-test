import { Col } from "antd";
import { useGetBrandsQuery } from "../../redux/services/brand/brandApi";
import { mdColLayout } from "../Shared/Form/FormLayout";
import CustomSelect from "../Shared/Select/CustomSelect";

export const BrandComponent = () => {
  const { data, isFetching } = useGetBrandsQuery({});

  console.log(data);

  const options = data?.results?.brand?.map((item) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  });

  return (
    <Col {...mdColLayout}>
      <CustomSelect
        name={"brand"}
        label="Brand"
        options={options}
        isLoading={isFetching}
        mode="multiple"
      />
    </Col>
  );
};
