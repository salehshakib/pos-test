import { Col, Row } from "antd";
import { useGetCategoriesQuery } from "../../redux/services/category/categoryApi";
import CustomForm from "../Shared/Form/CustomForm";
import {
  fullColLayout,
  mdColLayout,
  rowLayout,
} from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomUploader from "../Shared/Upload/CustomUploader";

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
            isSelectLoading={isParentCategoryLoading}
          />
        </Col>
        <Col {...fullColLayout}>
          <CustomUploader
            label={"Category Image"}
            name={"category_image"}
            multiple={true}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default CategoryForm;
