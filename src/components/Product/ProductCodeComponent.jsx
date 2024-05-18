import { Form } from "antd";
import { RiRefreshLine } from "react-icons/ri";
import CustomInputButton from "../Shared/Input/CustomInputButton";
import { generateRandomCode } from "../../utilities/lib/generateCode";

const ProductCodeComponent = () => {
  const form = Form.useFormInstance();

  const generate = () => {
    const randomCode = generateRandomCode(6);

    form?.setFieldValue("sku", randomCode);
  };

  return (
    <CustomInputButton
      label="Sku"
      type={"text"}
      required={true}
      name={"sku"}
      placeholder={"Generate Sku"}
      onClick={generate}
      icon={<RiRefreshLine className="text-xl" />}
    />
  );
};

export default ProductCodeComponent;
