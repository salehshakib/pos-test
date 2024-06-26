import { useGetDepartmentsQuery } from "../../redux/services/hrm/department/departmentApi";
import { useGlobalParams } from "../../utilities/hooks/useParams";
import CustomSelect from "../Shared/Select/CustomSelect";

export const DepartmentComponent = ({ name = "department_id" }) => {
  const params = useGlobalParams({
    // isPagination: true,
    // isDefaultParams: false,
    // params: {
    //   parent: 1,
    // },
    // isRelationalParams: true,
  });

  const { data, isFetching } = useGetDepartmentsQuery({ params });

  const options = data?.results?.department?.map((item) => ({
    value: item?.id?.toString(),
    label: item?.name,
  }));

  return (
    <CustomSelect
      label={"Department"}
      name={name}
      options={options}
      isLoading={isFetching}
      required={true}
    />
  );
};
