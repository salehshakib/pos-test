import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import { FiMinusCircle } from 'react-icons/fi';

import { fullColLayout, mdColLayout, rowLayout } from '../../layout/FormLayout';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';
import RichTextEditor from '../Shared/TextEditor/RichTextEditor';

export const EmailTemplateForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...mdColLayout}>
          <CustomInput label="Act" type={'text'} required={true} name={'act'} />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput
            label="Name"
            type={'text'}
            required={true}
            name={'name'}
          />
        </Col>

        <Col {...fullColLayout}>
          <CustomInput
            label="Subject"
            type={'text'}
            required={true}
            name={'subject'}
          />
        </Col>
      </Row>

      <Row>
        <Form.List
          name="shortcode"
          initialValue={[{ object: '', key: '' }]} // Setting the default item
          rules={[
            {
              validator: async (_, parameter) => {
                if (!parameter || parameter.length === 0) {
                  return Promise.reject(
                    new Error('At least 1 shortcode is required')
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <Col {...fullColLayout} className="">
              <Form.Item label="Shortcode">
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} {...rowLayout} gutter={16} className="w-full ">
                    <Col span={7}>
                      <Form.Item
                        {...restField}
                        name={[name, 'object']}
                        className=""
                        rules={[
                          {
                            validator: (_, value) => {
                              const trimmedValue = value?.trim();
                              const trimmedKey = props.form
                                .getFieldValue(['fields', name, 'key'])
                                ?.trim();

                              console.log(trimmedValue, trimmedKey);

                              if (trimmedValue && !trimmedKey) {
                                // If the object is filled but the key is not, we return a promise reject for the key field.
                                props.form.validateFields([
                                  ['fields', name, 'key'],
                                ]);
                                return Promise.resolve(); // No error for the object field.
                              }

                              if (!trimmedValue && trimmedKey) {
                                // If the object is not filled but the key is, we return a promise reject for the object field.
                                props.form.validateFields([
                                  ['fields', name, 'object'],
                                ]);
                                return Promise.resolve(); // No error for the key field.
                              }

                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <Input
                          placeholder="Object name"
                          className="border-2 w-full"
                          size="large"
                          variant="outlined"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={fields.length > 1 ? 16 : 17}>
                      <Form.Item
                        {...restField}
                        name={[name, 'key']}
                        rules={[
                          {
                            validator: (_, value) => {
                              const trimmedValue = value?.trim();
                              const trimmedObject = props.form
                                .getFieldValue(['fields', name, 'object'])
                                ?.trim();

                              if (trimmedObject && !trimmedValue) {
                                // If the object is filled but the key is not, we return a reject for the key field.
                                return Promise.reject(
                                  'Key is required when the object name is provided'
                                );
                              }

                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <Input
                          placeholder="Key"
                          className="border-2 w-full "
                          size="large"
                          variant="outlined"
                        />
                      </Form.Item>
                    </Col>

                    {fields.length > 1 && (
                      <Col span={1}>
                        <FiMinusCircle
                          size={20}
                          className="flex items-center justify-center  mt-2 hover:cursor-pointer hover; "
                          onClick={() => remove(name)}
                        />
                      </Col>
                    )}
                  </Row>
                ))}
              </Form.Item>

              <Col {...fullColLayout}>
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{
                      width: '100%',
                    }}
                    icon={<PlusOutlined />}
                  >
                    Add Shortcode
                  </Button>

                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </Col>
            </Col>
          )}
        </Form.List>
      </Row>

      <Row>
        <Col {...fullColLayout}>
          <RichTextEditor label="Body" required={true} name={'body'} />
        </Col>
      </Row>
    </CustomForm>
  );
};
