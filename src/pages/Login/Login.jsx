import { Button } from "antd";
import { useLoginMutation } from "../../redux/services/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/services/auth/authSlice";
import { verifyToken } from "../../utilities/lib/verifyToken";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/Shared/Form/CustomInput";
import CustomForm from "../../components/Shared/Form/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "../../utilities/validationSchemas/loginValidation.schema";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Logging in...");
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
    <div className="h-screen flex justify-center items-center bg-primary/20">
      <div className="lg:w-[500px]">
        <CustomForm
          onSubmit={onSubmit}
          resolver={zodResolver(loginValidationSchema)}
          className="flex flex-col gap-6"
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
          <Button
            htmlType="submit"
            loading={isLoading}
            className="font-bold w-full bg-secondary pt-2 pb-8 text-white cursor-pointer"
            type="default"
          >
            Submit
          </Button>
        </CustomForm>
      </div>
    </div>
  );
};

export default Login;
