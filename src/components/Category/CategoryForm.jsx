import { Col, Row } from "antd";
import { useGetAllCategoryQuery } from "../../redux/services/category/categoryApi";
import CustomForm from "../Shared/Form/CustomForm";
import { mdColLayout, rowLayout } from "../../layout/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";

const CategoryForm = (props) => {
  const { data, isLoading: isParentCategoryLoading } = useGetAllCategoryQuery(
    {}
  );

  const options = data?.results?.category?.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...mdColLayout}>
          <CustomInput
            label="Category Name"
            type={"text"}
            required={true}
            name={"name"}
            placeholder={"Category Name"}
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomSelect
            label="Parent Category"
            name={"parent_id"}
            options={options}
            placeholder={"Parent Category"}
            isLoading={isParentCategoryLoading}
          />
        </Col>
        {/* <Col {...fullColLayout}>
          <CustomUploader
            label={"Category Image"}
            name={"category_image"}
            
          />
        </Col> */}
      </Row>
    </CustomForm>
  );
};

export default CategoryForm;
