import { Col, Form, Row, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useGetAllCurrencyQuery } from "../../../redux/services/currency/currencyApi";
import { useEffect } from "react";
import CustomSelect from "../../Shared/Select/CustomSelect";
import CustomInput from "../../Shared/Input/CustomInput";

const CurrencyComponent = () => {
  const form = Form.useFormInstance();
  const { data, isLoading } = useGetAllCurrencyQuery({
    params: {
      selectValue: ["id", "name", "is_default"],
    },
  });

  const options = data?.results?.currency?.map((currency) => ({
    value: currency.id?.toString(),
    label: currency.name,
  }));

  useEffect(() => {
    if (options?.length) {
      form.setFieldValue("currency", options[0].value);
    }
  }, [form, options]);

  return (
    <CustomSelect
      placeholder={"currency"}
      showSearch={true}
      isLoading={isLoading}
      options={options}
      required={true}
      name="currency"
    />
  );
};

const CurrencyExchangeComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("exchange_rate", 1);
  }, [form]);

  const content = (
    <Tooltip title="Cuurency Exchange Rate">
      <InfoCircleOutlined
        style={{
          color: "rgba(0,0,0,.45)",
        }}
      />
    </Tooltip>
  );

  return (
    <CustomInput
      type={"number"}
      required={true}
      name={"exchange_rate"}
      placeholder={"Exchange Rate"}
      suffix={content}
    />
  );
};

export const CurrencyFormComponent = () => {
  return (
    <Form.Item label={"Currency Exchange Rate"} className="mb-0">
      <Row gutter={5}>
        <Col xs={14}>
          <CurrencyComponent />
        </Col>
        <Col xs={10}>
          <CurrencyExchangeComponent />
        </Col>
      </Row>
    </Form.Item>
  );
};
