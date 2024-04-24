import { Button } from "antd";
import { jwtDecode } from "jwt-decode";
import { IoMdMail } from "react-icons/io";
import { MdLockPerson } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomForm from "../../components/Shared/Form/CustomForm";
import CustomInput from "../../components/Shared/Form/CustomInput";
import { useLoginMutation } from "../../redux/services/auth/authApi";
import { setUser } from "../../redux/services/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Logging in...");

    try {
      const res = await login(data).unwrap();

      const user = jwtDecode(res.user);
      const userData = user?.data?.data?.[0];

      console.log(user);
      dispatch(setUser({ user: userData, token: res.access }));
      toast.success("Logged in successfully!", { id: toastId, duration: 2000 });
      navigate(`/dashboard`);
    } catch (error) {
      toast.error("Invalid credentials. Please try again!", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-[600px] bg-wave bg-no-repeat bg-cover">
        <div className="lg:w-[500px] md:w-[400px] p-10 bg-white rounded-md shadow-lg space-y-10">
          <div className="text-center font-bold text-xl border-gray-500">
            POS INVENTORY
          </div>
          <CustomForm onSubmit={onSubmit} className="flex flex-col gap-6 ">
            <CustomInput
              label="Email"
              type={"email"}
              required={true}
              name={"email"}
              placeholder={"Email"}
              prefix={<IoMdMail className="text-lg" />}
            />
            <CustomInput
              label="Password"
              type={"password"}
              name={"password"}
              required={true}
              placeholder={"Password"}
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
  );
};

export default Login;
