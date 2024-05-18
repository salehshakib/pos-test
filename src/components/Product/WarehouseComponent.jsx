import { Col, Form, Row } from "antd";
import { useGetWarehousesQuery } from "../../redux/services/warehouse/warehouseApi";
import CustomCheckbox from "../Shared/Checkbox/CustomCheckbox";
import { fullColLayout, rowLayout } from "../Shared/Form/FormLayout";
import DebouceSelect from "../Shared/Select/DebounceSelect";
import WarehouseTableComponent from "./WarehouseTableComponent";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const SearchWarehouse = () => {
  const [keyword, setKeyword] = useState(null);

  const { data, isFetching } = useGetWarehousesQuery(
    {
      params: {
        selectValue: ["id", "name"],
        keyword,
      },
    },
    {
      skip: !keyword,
    }
  );

  const options = data?.results?.warehouse?.map((warehouse) => ({
    value: warehouse.id?.toString(),
    label: warehouse.name,
  }));

  const debounce = useDebouncedCallback(async (value) => {
    if (value.trim() !== "") {
      setKeyword(value);
    }
  }, 1000);

  return (
    <DebouceSelect
      label="Warehouse"
      placeholder={"Warehouse Name"}
      onSearch={debounce}
      mode={"multiple"}
      options={options}
      isLoading={isFetching}
      name="warehouse_id"
    />
  );
};

const WarehouseComponent = () => {
  const form = Form.useFormInstance();
  const has_different_price = Form.useWatch("has_differnet_price", form);

  console.log(has_different_price);

  return (
    <Row {...rowLayout}>
      <Col {...fullColLayout}>
        <CustomCheckbox
          label="This product has different price for different warehouse"
          name="has_differnet_price"
        />
      </Col>

      {has_different_price && (
        <>
          <Col {...fullColLayout} className="mt-10">
            <SearchWarehouse />
          </Col>

          <Col {...fullColLayout}>
            <WarehouseTableComponent className="mb-10" />
          </Col>
        </>
      )}
    </Row>
  );
};

export default WarehouseComponent;
