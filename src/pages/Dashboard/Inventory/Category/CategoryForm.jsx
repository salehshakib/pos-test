import { Col, Row } from "antd";
import CustomForm from "../../../../components/Shared/Form/CustomForm";
import CustomInput from "../../../../components/Shared/Input/CustomInput";
import { useGetCategoriesQuery } from "../../../../redux/services/inventory/category/categoryApi";

const rowLayout = {
  gutter: 25,
  // align: "middle",
  // justify: "start",
};

const colLayout = {
  xs: 24,
  md: 12,
  lg: 8,
};
const CategoryForm = ({ handleSubmit, isLoading, fields }) => {
  const { data, isLoading: isParentCategoryLoading } = useGetCategoriesQuery(
    {}
  );

  const options = data?.results?.category?.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <CustomForm
      handleSubmit={handleSubmit}
      className=""
      fields={fields}
      isLoading={isLoading}
    >
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomInput
            label="Category Name"
            type={"text"}
            required={true}
            name={"name"}
            placeholder={"Category Name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Parent Category"
            type={"select"}
            name={"parent_id"}
            options={options}
            placeholder={"Parent Category"}
            isSelectLoading={isParentCategoryLoading}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Number of Product"
            type={"number"}
            required={true}
            // name={"name"}
            placeholder={"Number of Product"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Stock Quantity"
            type={"number"}
            required={true}
            // name={"name"}
            placeholder={"Stock Quantity"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Stock Worth"
            type={"number"}
            required={true}
            // name={"name"}
            placeholder={"Stock Worth"}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default CategoryForm;
