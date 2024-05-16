import { Col } from "antd";
import { useGetCategoriesQuery } from "../../redux/services/category/categoryApi";
import { mdColLayout } from "../Shared/Form/FormLayout";
import CustomSelect from "../Shared/Select/CustomSelect";

export const CategoryComponent = () => {
  const { data, isFetching } = useGetCategoriesQuery({});

  const options = data?.results?.category?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  return (
    <Col {...mdColLayout}>
      <CustomSelect
        label="Category"
        name={"category_id"}
        options={options}
        isLoading={isFetching}
        mode="multiple"
      />
    </Col>
  );
};
