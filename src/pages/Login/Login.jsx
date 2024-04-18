import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomButton from "../../components/Shared/Button/CustomButton";
import CustomForm from "../../components/Shared/Form/CustomForm";
import CustomInput from "../../components/Shared/Form/CustomInput";
import { useLoginMutation } from "../../redux/services/auth/authApi";
import { setUser } from "../../redux/services/auth/authSlice";
import { verifyToken } from "../../utilities/lib/verifyToken";
import { loginValidationSchema } from "../../utilities/validationSchemas/loginValidation.schema";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Logging in...");

    console.log(toastId);
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.access);
      dispatch(setUser({ user: user, token: res.access }));
      toast.success("Logged in successfully!", { id: toastId, duration: 2000 });
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Invalid credentials. Please try again!", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-[600px] bg-wave bg-no-repeat  bg-cover">
        <div className="lg:w-[500px] md:w-[400px] p-10 bg-white rounded-md shadow-lg space-y-10">
          <div className="text-center font-bold text-xl  border-gray-500">
            POS INVENTORY
          </div>
          <CustomForm
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
            className="flex flex-col gap-6 "
          >
            <CustomInput
              label="Email"
              type={"email"}
              required={true}
              name={"email"}
              placeholder={"Email"}
            />
            <CustomInput
              label="Password"
              type={"password"}
              name={"password"}
              required={true}
              placeholder={"Password"}
            />
            {/* <Button
              htmlType="submit"
              loading={isLoading}
              className="font-bold w-full pt-2 pb-8 bg-secondary"
              type="primary"
            >
              Enter
            </Button> */}
            <CustomButton isLoading={isLoading} btnContent={"Enter"} />
          </CustomForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
