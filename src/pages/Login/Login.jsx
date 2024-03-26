import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/services/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/services/auth/authSlice";
import { verifyToken } from "../../utilities/lib/verifyToken";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.access);
      dispatch(setUser({ user: user, token: res.access }));
      toast.success("Logged in successfully!", { id: toastId, duration: 2000 });
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials. Please try again!", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full max-w-xl"
      >
        <input
          type="text"
          name="email"
          required
          placeholder="Email"
          {...register("email")}
          className="outline outline-1 rounded py-2 outline-gray-400 px-4"
        />
        <input
          type="text"
          id="password"
          required
          placeholder="Password"
          {...register("password")}
          className="outline outline-1 rounded py-2 outline-gray-400 px-4"
        />
        <Button
          htmlType="submit"
          loading={isLoading}
          className="font-bold bg-blue-500"
          type="primary"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
