import { Col, Row } from "antd";
import { fullColLayout, mdColLayout, rowLayout } from "../../layout/FormLayout";
import { useGetAllExpenseCategoryQuery } from "../../redux/services/expense/expenseCategoryApi";
import { useGetWarehousesQuery } from "../../redux/services/warehouse/warehouseApi";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";

const ExpenseCategoryComponent = () => {
  const { data, isLoading } = useGetAllExpenseCategoryQuery({});

  const options = data?.results?.expensecategory?.map((item) => ({
    value: item.id?.toString(),
    label: item.name,
  }));

  return (
    <CustomSelect
      label={"Expense Category"}
      name={"category_id"}
      options={options}
      isLoading={isLoading}
    />
  );
};

const WarehouseComponent = () => {
  const { data, isLoading } = useGetWarehousesQuery({
    params: {
      selectValue: ["id", "name"],
    },
  });

  const options = data?.results?.warehouse?.map((warehouse) => ({
    value: warehouse.id?.toString(),
    label: warehouse.name,
  }));

  return (
    <CustomSelect
      label="Warehouse "
      showSearch={true}
      isLoading={isLoading}
      options={options}
      name="warehouse_id"
      required={true}
    />
  );
};

export const ExpenseForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...mdColLayout}>
          <WarehouseComponent />
        </Col>
        <Col {...mdColLayout}>
          <ExpenseCategoryComponent />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput
            label="Amount"
            type={"number"}
            required={true}
            name={"amount"}
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomDatepicker label="Date" type={"date"} name={"date"} />
        </Col>
        <Col {...fullColLayout}>
          <CustomInput label="Note" type={"textarea"} name={"note"} />
        </Col>
      </Row>
    </CustomForm>
  );
};
