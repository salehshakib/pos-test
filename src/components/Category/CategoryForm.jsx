import { Col, Row } from "antd";
import { fullColLayout, mdColLayout, rowLayout } from "../../layout/FormLayout";
import { useGetAllCategoryQuery } from "../../redux/services/category/categoryApi";
import { useCustomDebounce } from "../../utilities/hooks/useDebounce";
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from "../../utilities/hooks/useParams";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import DebounceSelect from "../Shared/Select/DebounceSelect";
import CustomUploader from "../Shared/Upload/CustomUploader";

const ParentCategoryComponent = () => {
  const { keyword, debounce } = useCustomDebounce();

  const params = useGlobalParams({
    // isPagination: true,
    // isDefaultParams: true,
    // isRelationalParams: true,
    // selectValueParams: ["is_active"],
    selectValue: DEFAULT_SELECT_VALUES,
    keyword,
  });

  const { data, isFetching } = useGetAllCategoryQuery(
    { params },
    {
      skip: !keyword,
    }
  );

  const options = data?.results?.category?.map((category) => ({
    key: category.id,
    value: category.id?.toString(),
    label: category.name,
  }));

  console.log(isFetching);

  return (
    <DebounceSelect
      label="Parent Category"
      name={"parent_id"}
      placeholder={"Parent Category"}
      onSearch={debounce}
      // required={true}
      options={options}
      // mode={"multiple"}
      isLoading={isFetching}
      // onSelect={onSelect}
    />
  );
};

const CategoryForm = (props) => {
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
          <ParentCategoryComponent />
        </Col>
        <Col {...fullColLayout}>
          <CustomUploader
            label={"Category Image"}
            name={"attachment"}
            required={true}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default CategoryForm;
