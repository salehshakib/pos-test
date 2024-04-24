import CustomForm from "../../../../components/Shared/Form/CustomForm";
import CustomInput from "../../../../components/Shared/Form/CustomInput";

const CreateDepartment = ({ handleSubmit, isLoading, fields }) => {
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      className="flex flex-col gap-6"
      fields={fields}
      isLoading={isLoading}
    >
      <CustomInput
        label="Department Name"
        type={"text"}
        required={true}
        name={"name"}
        placeholder={"Department Name"}
      />
    </CustomForm>
  );
};

export default CreateDepartment;
