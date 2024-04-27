import { Col, Row } from "antd";
import CustomForm from "../../../../components/Shared/Form/CustomForm";
import CustomInput from "../../../../components/Shared/Form/CustomInput";
import { useGetCategoriesQuery } from "../../../../redux/services/category/categoryApi";

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
      <Row gutter={25}>
        <Col xs={24} md={12} lg={8}>
          <CustomInput
            label="Category Name"
            type={"text"}
            required={true}
            name={"name"}
            placeholder={"Category Name"}
          />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <CustomInput
            label="Parent Category"
            type={"select"}
            name={"parent_id"}
            options={options}
            placeholder={"Parent Category"}
            isSelectLoading={isParentCategoryLoading}
          />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <CustomInput
            label="Number of Product"
            type={"number"}
            required={true}
            // name={"name"}
            placeholder={"Number of Product"}
          />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <CustomInput
            label="Stock Quantity"
            type={"number"}
            required={true}
            // name={"name"}
            placeholder={"Stock Quantity"}
          />
        </Col>
        <Col xs={24} md={12} lg={8}>
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
