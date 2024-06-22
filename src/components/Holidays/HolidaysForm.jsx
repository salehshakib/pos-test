import { Col, Form, Row } from "antd";
import { useEffect } from "react";
import { fullColLayout, mdColLayout, rowLayout } from "../../layout/FormLayout";
import { useGetDepartmentsQuery } from "../../redux/services/hrm/department/departmentApi";
import { getCurrentDate } from "../../utilities/lib/currentDate";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomCheckbox from "../Shared/Checkbox/CustomCheckbox";

const DepartmentComponent = () => {
  const { data, isFetching } = useGetDepartmentsQuery({});

  const options = data?.results?.department?.map((item) => ({
    value: item?.id?.toString(),
    label: item?.name,
  }));

  return (
    <CustomSelect
      label="Department"
      name="department_ids"
      options={options}
      isLoading={isFetching}
      mode="multiple"
      required={true}
    />
  );
};

const HolidayStartComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("start_date", getCurrentDate);
  }, [form]);

  return (
    <CustomDatepicker name="start_date" label="Start Date" required={true} />
  );
};

export const HolidaysForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomInput
            label="Title"
            type={"text"}
            required={true}
            name={"title"}
          />
        </Col>

        <Col {...fullColLayout}>
          <DepartmentComponent />
        </Col>

        <Col {...mdColLayout}>
          <HolidayStartComponent />
        </Col>
        <Col {...mdColLayout}>
          <CustomDatepicker name="end_date" label="End Date" required={true} />
        </Col>

        <Col {...fullColLayout}>
          <CustomCheckbox name="is_occassion" label="Occasional Holidays" />
        </Col>
        <Col {...fullColLayout}>
          <CustomCheckbox name="is_announcement" label="Make an Announcement" />
        </Col>
        <Col {...fullColLayout}>
          <CustomCheckbox name="is_send_email" label="Send Email" />
        </Col>
      </Row>
    </CustomForm>
  );
};
