import { Button, Col, Form, Row } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import CustomDatepicker from '../../../components/Shared/DatePicker/CustomDatepicker';
import CustomInput from '../../../components/Shared/Input/CustomInput';
import { colLayout, rowLayout } from '../../../layout/FormLayout';
import { useUpdateHrmSettingMutation } from '../../../redux/services/settings/hrmSettings/hrmSettingsApi';
import { appendToFormData } from '../../../utilities/lib/appendFormData';
import { fieldsToUpdate } from '../../../utilities/lib/fieldsToUpdate';

export const HrmSettingForm = ({ data }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const startTime = Form.useWatch('start_time', form);
  const endTime = Form.useWatch('end_time', form);

  useEffect(() => {
    if (startTime && endTime) {
      // Check if endTime is before startTime
      let timeDiff = endTime.diff(startTime, 'second');

      // If endTime is earlier than startTime, assume endTime is the next day
      if (timeDiff < 0) {
        // Add 24 hours (in seconds) to the difference
        timeDiff = endTime.add(1, 'day').diff(startTime, 'second');
      }

      const hours = Math.floor(timeDiff / 3600);
      const minutes = Math.floor((timeDiff % 3600) / 60);
      const seconds = timeDiff % 60;

      const formattedTime = `${String(hours).padStart(2, '0')}:${String(
        minutes
      ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      form.setFieldValue('office_hours', formattedTime);
    }
  }, [form, startTime, endTime]);

  const [updateHrmSetting, { isLoading }] = useUpdateHrmSettingMutation();

  useEffect(() => {
    if (data) {
      const fieldData = fieldsToUpdate(data);

      const updateFieldData = [
        ...fieldData,
        {
          name: 'start_time',
          value: dayjs(
            data?.start_time === 'Invalid Date' ? '00:00:00' : data?.start_time,
            'HH:mm:ss'
          ),
          errors: '',
        },
        {
          name: 'end_time',
          value: dayjs(
            data?.end_time === 'Invalid Date' ? '00:00:00' : data?.end_time,
            'HH:mm:ss'
          ),
          errors: '',
        },
      ];

      setFields(updateFieldData);
    }
  }, [data]);

  const handleSubmit = async (values) => {
    const formData = new FormData();

    // Object.entries(values).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });

    const { start_time, end_time } = values;

    // const timeString = values?.office_hours ?? "00:00:00";
    // const [hours] = timeString.split(":").map(Number);
    const postData = {
      start_time: start_time.format('HH:mm:ss'),
      end_time: end_time.format('HH:mm:ss'),
      // office_hours: hours,
      _method: 'PUT',
    };

    appendToFormData(postData, formData);

    await updateHrmSetting({
      data: formData,
    });
  };

  const onFinish = (values) => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => {
        handleSubmit(values);
      })
      .catch((error) => {
        console.error('Validation error:', error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.error(errorInfo);
  };

  return (
    <div className="pt-10">
      <Form
        form={form}
        fields={fields}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="on"
        onFinishFailed={onFinishFailed}
        disabled={!data}
      >
        <Row {...rowLayout}>
          <Col {...colLayout}>
            <CustomDatepicker
              name="start_time"
              label=" Start Time"
              placeholder="Start Time"
              required={true}
              type="time"
              picker={'time'}
            />
          </Col>
          <Col {...colLayout}>
            <CustomDatepicker
              label="End Time"
              type="time"
              picker="time"
              required={true}
              name={'end_time'}
              placeholder={'End Time'}
            />
          </Col>
          <Col {...colLayout}>
            <CustomInput
              label="Office Hours"
              type="text"
              name={'office_hours'}
              isReadOnly={true}
            />
          </Col>
        </Row>

        <div className="flex w-full items-center justify-end gap-3">
          <Button htmlType="submit" type="primary" loading={isLoading}>
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};
