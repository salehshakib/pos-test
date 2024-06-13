import { Col, Form, Row } from "antd";
import { colLayout, rowLayout } from "../../layout/FormLayout";
import { useGetDepartmentsQuery } from "../../redux/services/hrm/department/departmentApi";
import { useGetAllEmployeeQuery } from "../../redux/services/hrm/employee/employeeApi";
import { useGetAllLeaveTypeQuery } from "../../redux/services/settings/leaveType/leaveType";
import CustomForm from "../Shared/Form/CustomForm";
import CustomSelect from "../Shared/Select/CustomSelect";

const DepartmentComponent = () => {
  const { data, isFetching } = useGetDepartmentsQuery({});

  const options = data?.results?.department?.map((item) => ({
    value: item?.id?.toString(),
    label: item?.name,
  }));

  return (
    <CustomSelect
      label={"Department"}
      name={"department_id"}
      options={options}
      isLoading={isFetching}
      required={true}
    />
  );
};

const EmployeeComponent = () => {
  const form = Form.useFormInstance();
  const department = Form.useWatch("department_id", form);

  const { data, isFetching } = useGetAllEmployeeQuery(
    {
      params: {
        department_id: department,
      },
    },
    {
      skip: !department,
    }
  );

  const options = data?.results?.employee?.map((item) => ({
    value: item?.id?.toString(),
    label: item?.name,
  }));

  return (
    <CustomSelect
      label={"Employee"}
      name={"employee_id"}
      options={options}
      isLoading={isFetching}
      required={true}
    />
  );
};
const LeaveTypeComponent = () => {
  const { data, isFetching } = useGetAllLeaveTypeQuery({});

  const options = data?.results?.leavetype?.map((item) => ({
    value: item?.id?.toString(),
    label: item?.name,
  }));

  return (
    <CustomSelect
      label={"Leave Type"}
      name={"leave_type_id"}
      options={options}
      isLoading={isFetching}
      required={true}
    />
  );
};

export const LeaveForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <DepartmentComponent />
        </Col>
        <Col {...colLayout}>
          <EmployeeComponent />
        </Col>
        <Col {...colLayout}>
          <LeaveTypeComponent />
        </Col>
      </Row>
    </CustomForm>
  );
};
