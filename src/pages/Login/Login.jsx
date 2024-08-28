import { Button, Form, Tag } from 'antd';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { IoMdMail } from 'react-icons/io';
import { MdLockPerson } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CustomForm from '../../components/Shared/Form/CustomForm';
import CustomInput from '../../components/Shared/Input/CustomInput';
import { useLoginMutation } from '../../redux/services/auth/authApi';
import { setUser } from '../../redux/services/auth/authSlice';
import { isDev } from '../../utilities/configs/base_url';
import { openNotification } from '../../utilities/lib/openToaster';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (isDev.toLowerCase() === 'true') {
      form.setFieldsValue({
        email: import.meta.env.VITE_DEV_EMAIL,
        password: import.meta.env.VITE_DEV_PASSWORD,
      });
    }
  }, [form]);

  const handleSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();

      const userData = res?.data?.user;
      const token = res?.data.token;

      dispatch(setUser({ user: userData, token }));
      openNotification('success', 'Logged in successfully!');
      navigate(`/dashboard`);
    } catch (error) {
      openNotification('error', 'Invalid credentials. Please try again!');
    }
  };

  const { primaryColor } = useSelector((state) => state.theme);

  const svgBackground = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full h-auto">
    <path fill="${primaryColor}" fill-opacity="1" d="M0,320L120,293.3C240,267,480,213,720,202.7C960,192,1200,224,1320,240L1440,256L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
  </svg>`;

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div
        className="h-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            svgBackground
          )}")`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top -10vh',
        }}
      >
        <div className="flex h-full items-center justify-center">
          <div className="space-y-10 rounded-md bg-white p-10 shadow-lg md:w-[400px] lg:w-[500px]">
            <div className="flex flex-col gap-1 border-gray-500 text-center text-xl font-bold">
              POS INVENTORY
              <div>
                {isDev.toLowerCase() === 'true' && (
                  <Tag color="purple" className="font-semibold">
                    DEV MODE
                  </Tag>
                )}
              </div>
            </div>

            <CustomForm
              handleSubmit={handleSubmit}
              className="flex flex-col gap-6"
              submitBtn={false}
              form={form}
            >
              <CustomInput
                label="Email"
                type={'email'}
                required={true}
                name={'email'}
                placeholder={'Email'}
                prefix={<IoMdMail className="text-lg" />}
              />
              <CustomInput
                label="Password"
                type={'password'}
                name={'password'}
                required={true}
                placeholder={'Password'}
                prefix={<MdLockPerson className="text-lg" />}
              />
              <Button
                htmlType="submit"
                loading={isLoading}
                className="w-full"
                type="default"
                size="large"
              >
                Enter
              </Button>
            </CustomForm>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
