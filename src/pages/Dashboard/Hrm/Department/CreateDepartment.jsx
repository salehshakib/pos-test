import CustomForm from "../../../../components/Shared/Form/CustomForm";
import CustomInput from "../../../../components/Shared/Form/CustomInput";

const CreateDepartment = ({ onClose, handleSubmit, isLoading, fields }) => {
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      className="flex flex-col gap-6"
      fields={fields}
      isLoading={isLoading}
      onClose={onClose}
    >
      <CustomInput
        label="Department Name"
        type={"text"}
        required={true}
        name={"name"}
        placeholder={"Department Name"}
      />

      {/* <div className="w-full flex gap-3 justify-end items-center">
        <Button type="default" onClick={onClose}>
          Cancel
        </Button>
        <Button
          htmlType="submit"
          className="bg-secondary hover:bg-posPurple text-white"
          loading={isLoading}
        >
          Submit
        </Button>
      </div> */}
    </CustomForm>
  );
};

export default CreateDepartment;
