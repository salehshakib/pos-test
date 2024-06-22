import { Col, Form, Row } from "antd";
import {
  colLayout,
  fullColLayout,
  mdColLayout,
  rowLayout,
} from "../../layout/FormLayout";
import { useGetDepartmentsQuery } from "../../redux/services/hrm/department/departmentApi";
import { useGetAllEmployeeQuery } from "../../redux/services/hrm/employee/employeeApi";
import { useGetAllLeaveTypeQuery } from "../../redux/services/settings/leaveType/leaveType";
import CustomForm from "../Shared/Form/CustomForm";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomRadio from "../Shared/Radio/CustomRadio";
import { getCurrentDate } from "../../utilities/lib/currentDate";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import { useEffect } from "react";
import CustomUploader from "../Shared/Upload/CustomUploader";
import CustomInput from "../Shared/Input/CustomInput";
import CustomCheckbox from "../Shared/Checkbox/CustomCheckbox";

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

const LeaveDuration = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("leave_duration", "Half Day");
  }, [form]);

  const options = [
    {
      value: "Half Day",
      label: <span className="font-semibold">Half Day</span>,
    },
    {
      value: "Single Day",
      label: <span className="font-semibold">Single Day</span>,
    },
    {
      value: "Multiple Days",
      label: <span className="font-semibold">Multiple Days</span>,
    },

    {
      value: "Hours",
      label: <span className="font-semibold">Hours</span>,
    },
  ];
  return (
    <CustomRadio
      label={"Leave Duration"}
      name={"leave_duration"}
      options={options}
      required={true}
    />
  );
};

const LeaveStartComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("leave_start_date", getCurrentDate);
  }, [form]);

  return (
    <CustomDatepicker
      name="leave_start_date"
      label="Start Date"
      required={true}
    />
  );
};

const HalfDayComponent = () => {
  const form = Form.useFormInstance();
  const durationType = Form.useWatch("leave_duration", form);

  const options = [
    {
      value: "First Half",
      label: <span className="font-semibold">First Half</span>,
    },
    {
      value: "Second Half",
      label: <span className="font-semibold">Second Half</span>,
    },
  ];

  return (
    durationType === "Half Day" && (
      <Col {...mdColLayout}>
        <CustomRadio
          label={"Select Half Day"}
          name={"leave_half"}
          options={options}
          required={true}
        />
      </Col>
    )
  );
};

const LeaveEndComponent = () => {
  const form = Form.useFormInstance();
  const durationType = Form.useWatch("leave_duration", form);
  useEffect(() => {
    if (durationType === "Single Day") {
      form.setFieldValue("leave_end_date", getCurrentDate);
    }
  }, [durationType, form]);

  console.log(durationType);

  return (
    (durationType === "Single Day" || durationType === "Multiple Days") && (
      <Col {...mdColLayout}>
        <CustomDatepicker
          name="leave_end_date"
          label="End Date"
          required={true}
        />
      </Col>
    )
  );
};
const HoursComponent = () => {
  const form = Form.useFormInstance();
  const durationType = Form.useWatch("leave_duration", form);
  useEffect(() => {
    if (durationType === "Hours") {
      form.setFieldValue("leave_end_date", getCurrentDate);
    }
  }, [durationType, form]);

  return (
    durationType === "Hours" && (
      <Col {...mdColLayout}>
        <Row {...rowLayout}>
          <Col {...mdColLayout}>
            <CustomDatepicker
              name="leave_start_time"
              label="Leave Start Time"
              required={true}
            />
          </Col>

          <Col {...mdColLayout}>
            <CustomDatepicker
              name="leave_end_time"
              label="Leave End Time"
              required={true}
            />
          </Col>
        </Row>
      </Col>
    )
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
        <Col {...fullColLayout}>
          <LeaveDuration />
        </Col>
        <Col {...mdColLayout}>
          <LeaveStartComponent />
        </Col>

        <HalfDayComponent />

        <LeaveEndComponent />

        <HoursComponent />

        <Col {...fullColLayout}>
          <CustomUploader name="attachment" label={"Attachment"} />
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
