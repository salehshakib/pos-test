import { Col, Row } from "antd";
import {
  colLayout,
  fullColLayout,
  mdColLayout,
  rowLayout,
} from "../../layout/FormLayout";
import { useGetDepartmentsQuery } from "../../redux/services/hrm/department/departmentApi";
import { useGetAllDesignationQuery } from "../../redux/services/hrm/designation/designationApi";
import CustomCheckbox from "../Shared/Checkbox/CustomCheckbox";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomUploader from "../Shared/Upload/CustomUploader";

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

const DesignationComponent = () => {
  const { data, isFetching } = useGetAllDesignationQuery({});

  const options = data?.results?.designation?.map((item) => ({
    value: item?.id?.toString(),
    label: item?.name,
  }));

  return (
    <CustomSelect
      label={"Designation"}
      name={"designation_id"}
      options={options}
      isLoading={isFetching}
      required={true}
    />
  );
};
const EmployeeStatusComponent = () => {
  const options = [
    {
      value: "Intern",
      label: "Intern",
    },
    {
      value: "Probation",
      label: "Probation",
    },
    {
      value: "Contractual",
      label: "Contractual",
    },
    {
      value: "Permanent",
      label: "Permanent",
    },
  ];

  return (
    <CustomSelect
      label={"Employee Status"}
      name={"employee_status"}
      options={options}
      required={true}
    />
  );
};

const EmployeeForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...mdColLayout}>
          <CustomInput label="Name" type="text" name={"name"} required={true} />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput label="Email" name={"email"} required={true} />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput label="NID Number" name={"nid_number"} required={true} />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput
            label="Phone Number"
            type="phone"
            name={"phone_number"}
            required={true}
          />
        </Col>
        <Col {...mdColLayout}>
          <DepartmentComponent />
        </Col>
        <Col {...mdColLayout}>
          <DesignationComponent />
        </Col>
        <Col {...colLayout}>
          <CustomDatepicker
            label="Joining Date"
            name={"joining_date"}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Salary"
            name={"salary"}
            type={"number"}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <EmployeeStatusComponent />
        </Col>
        <Col {...fullColLayout}>
          <CustomUploader label={"Profile Picture"} name={"profile_picture"} />
        </Col>
        <Col {...mdColLayout}>
          <CustomUploader label={"NID Front"} name={"nid_front"} />
        </Col>
        <Col {...mdColLayout}>
          <CustomUploader label={"NID Back"} name={"nid_back"} />
        </Col>
        <Col {...mdColLayout}>
          <CustomUploader label={"Joining Document"} name={"joining_doc"} />
        </Col>
        <Col {...mdColLayout}>
          <CustomUploader label={"CV"} name={"cv"} />
        </Col>

        <Col {...fullColLayout}>
          <CustomInput
            label="Address"
            multiple={true}
            type={"textarea"}
            name={"address"}
            required={true}
          />
        </Col>

        <Col {...colLayout}>
          <CustomCheckbox label="Software Access" name={"software_access"} />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default EmployeeForm;
