import { Button } from "antd";
import CustomForm from "../../../../components/Shared/Form/CustomForm";
import CustomInput from "../../../../components/Shared/Form/CustomInput";

const CreateDepartment = () => {
  return (
    <CustomForm
      // onSubmit={onSubmit}
      // resolver={zodResolver(loginValidationSchema)}
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
        // loading={isLoading}
        className="w-full"
        type="default"
        size="large"
      >
        Enter
      </Button>
    </CustomForm>
  );
};

export default CreateDepartment;
