import { Button } from "antd";
import CustomForm from "../../../components/Shared/Form/CustomForm";
import CustomInput from "../../../components/Shared/Form/CustomInput";
import CustomSelect from "../../../components/Shared/Form/CustomSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductValidationSchema } from "../../../utilities/validationSchemas/createProductValidation.schema";

const CreateProduct = () => {
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="w-[500px] mx-auto">
      <CustomForm
        onSubmit={onSubmit}
        resolver={zodResolver(createProductValidationSchema)}
      >
        <CustomInput
          label={"Product Name"}
          name={"productName"}
          placeholder={"Enter Product Name"}
          type={"text"}
        />
        <CustomSelect
          label={"Product Type"}
          name={"productType"}
          placeholder={"Select Product Type"}
        />
        <CustomSelect
          mode={"multiple"}
          label={"Product Category"}
          name={"productCategory"}
          placeholder={"Select Product Category"}
        />

        <Button type="primary" htmlType="submit" className="bg-secondary">
          Submit
        </Button>
      </CustomForm>
    </div>
  );
};

export default CreateProduct;
