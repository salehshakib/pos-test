import { Col, Row } from 'antd';

import { fullColLayout, mdColLayout, rowLayout } from '../../layout/FormLayout';
import { useGetAllAccountQuery } from '../../redux/services/account/accountApi';
import CustomDatepicker from '../Shared/DatePicker/CustomDatepicker';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';
import CustomSelect from '../Shared/Select/CustomSelect';
import CustomUploader from '../Shared/Upload/CustomUploader';

const BalanceDepositForm = (props) => {
  const { data, isLoading } = useGetAllAccountQuery({});

  const options = data?.results?.account?.map((item) => ({
    value: item.id?.toString(),
    label: item.name,
  }));

  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...mdColLayout}>
          <CustomSelect
            label="Account"
            required={true}
            options={options}
            isLoading={isLoading}
            showSearch={true}
            name="account_id"
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput
            label="Deposited By"
            type={'text'}
            name={'deposited_by'}
            required
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput label="Amount" type={'text'} name={'amount'} required />
        </Col>
        <Col {...mdColLayout}>
          <CustomDatepicker
            label="Deposited At"
            name={'deposited_at'}
            type={'date'}
            required
          />
        </Col>
        <Col {...fullColLayout}>
          <CustomSelect
            name={'deposited_type'}
            label={'Deposited Type'}
            placeholder="Deposited Type"
            required
            options={[
              {
                value: 'Cash',
                label: 'Cash',
              },
              {
                value: 'Check',
                label: 'Check',
              },
              {
                value: 'Bank',
                label: 'Bank',
              },
            ]}
          />
        </Col>
        <Col {...fullColLayout}>
          <CustomUploader label={'Deposit Attachment'} name={'attachment'} />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default BalanceDepositForm;
