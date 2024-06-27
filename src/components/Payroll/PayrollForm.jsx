import { Col, Form, Row } from "antd";
import {
  colLayout,
  fullColLayout,
  mdColLayout,
  rowLayout,
} from "../../layout/FormLayout";
import { useGetAllEmployeeQuery } from "../../redux/services/hrm/employee/employeeApi";
import { DepartmentComponent } from "../ReusableComponent/DepartmentComponent";
import CustomCheckbox from "../Shared/Checkbox/CustomCheckbox";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import { paymentTypesOptions } from "../../assets/data/paymentTypes";
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from "../../utilities/hooks/useParams";

const EmployeeComponent = () => {
  const form = Form.useFormInstance();
  const departmentId = Form.useWatch("department_ids", form);

  const params = useGlobalParams({
    // isPagination: true,
    // isDefaultParams: false,
    // params: {
    //   parent: 1,
    // },
    // isRelationalParams: true,
    params: {
      department_id: departmentId,
    },
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isFetching } = useGetAllEmployeeQuery(
    { params },
    {
      skip: !departmentId,
    }
  );

  const options = data?.results?.employee?.map((item) => ({
    value: item?.id?.toString(),
    label: item?.name,
  }));
  return (
    <CustomSelect
      label="Employee"
      name="employee_id"
      options={options}
      required={true}
      isLoading={isFetching}
    />
  );
};

// const DepartmentComponent = () => {
//   const { data, isFetching } = useGetDepartmentsQuery({});

//   const options = data?.results?.department?.map((item) => ({
//     value: item?.id?.toString(),
//     label: item?.name,
//   }));

//   return (
//     <CustomSelect
//       label="Department"
//       name="department_ids"
//       options={options}
//       isLoading={isFetching}
//       required={true}
//     />
//   );
// };

const PaymentTypeComponent = () => {
  return (
    <CustomSelect
      label="Payment Type"
      name="peyment_type"
      options={paymentTypesOptions}
      required={true}
    />
  );
};

export const PayrollForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomDatepicker name="date" label="Date" required={true} />
        </Col>
        <Col {...colLayout}>
          <DepartmentComponent name="department_ids" />
        </Col>
        <Col {...colLayout}>
          <EmployeeComponent />
        </Col>
        <Col {...mdColLayout}>
          <PaymentTypeComponent />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput
            label="Salary"
            name="salary"
            type={"number"}
            required={true}
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput
            label="Bonus"
            name="bonus"
            type={"number"}
            required={true}
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput
            label="Loan"
            name="loan"
            type={"number"}
            required={true}
          />
        </Col>

        <Col {...fullColLayout}>
          <CustomInput
            label="Description"
            name="description"
            type={"textarea"}
            required={true}
          />
        </Col>

        <Col {...fullColLayout}>
          <CustomCheckbox name="is_send_email" label="Send Email" />
        </Col>
      </Row>
    </CustomForm>
  );
};
