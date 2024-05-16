import { Form } from "antd";
import { RiRefreshLine } from "react-icons/ri";
import CustomInputButton from "../Shared/Input/CustomInputButton";
import { generateRandomCode } from "../../utilities/lib/generateCode";

const ProductCodeComponent = () => {
  const form = Form.useFormInstance();

  const generate = () => {
    const randomCode = generateRandomCode(6);

    form?.setFieldValue("product_code", randomCode);
  };

  return (
    <CustomInputButton
      label="Product Code"
      type={"text"}
      required={true}
      name={"product_code"}
      onClick={generate}
      icon={<RiRefreshLine className="text-xl" />}
    />
  );
};

export default ProductCodeComponent;
