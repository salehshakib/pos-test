import { Col, Form, Row } from "antd";
import { fullColLayout, mdColLayout, rowLayout } from "../../layout/FormLayout";
import { useGetDepartmentsQuery } from "../../redux/services/hrm/department/departmentApi";
import CustomCheckbox from "../Shared/Checkbox/CustomCheckbox";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import { useEffect } from "react";
import dayjs from "dayjs";

const DateComponent = () => {
  const form = Form.useFormInstance();
  useEffect(() => {
    const currentDate = dayjs(new Date());
    form.setFieldsValue({
      start_date: currentDate,
      end_date: currentDate,
    });
  }, [form]);

  return (
    <>
      <Col {...mdColLayout}>
        <CustomDatepicker
          label="Start Date"
          name={"start_date"}
          required={true}
        />
      </Col>

      <Col {...mdColLayout}>
        <CustomDatepicker label="End Date" name={"end_date"} required={true} />
      </Col>
    </>
  );
};
const DepartmentComponent = () => {
  const { data, isFetching } = useGetDepartmentsQuery({});
  const form = Form.useFormInstance();

  const isAllSelected = Form.useWatch("all_departments", form);

  const options = data?.results?.department?.map((item) => ({
    value: item?.id?.toString(),
    label: item?.name,
  }));

  useEffect(() => {
    if (isAllSelected && options) {
      form.setFieldValue(
        "department_ids",
        options?.map((item) => item.value)
      );
    } else {
      form.setFieldValue("department_ids", []);
    }
  }, [form, isAllSelected, options]);

  return isAllSelected ? (
    <>
      <Form.Item name="department_ids" noStyle />
    </>
  ) : (
    <CustomSelect
      label={"Departments"}
      name={"department_ids"}
      options={options}
      isLoading={isFetching}
      required={true}
      mode={"multiple"}
    />
  );
};

const AllDepartmentsComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("all_departments", true);
  }, [form]);

  return (
    <CustomCheckbox label="For All Departments" name={"all_departments"} />
  );
};

export const AnnouncementForm = (props) => {
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

        <DateComponent />

        <Col {...fullColLayout} className="mb-2">
          <AllDepartmentsComponent />
        </Col>

        <Col {...fullColLayout}>
          <DepartmentComponent />
        </Col>

        <Col {...fullColLayout}>
          <CustomCheckbox label="Send Email" name={"is_send_email"} />
        </Col>
      </Row>
    </CustomForm>
  );
};
