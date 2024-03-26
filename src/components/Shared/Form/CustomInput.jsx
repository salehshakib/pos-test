import { Input } from "antd";
import { Controller } from "react-hook-form";

const CustomInput = ({ type, name, label, placeholder }) => {
  return (
    <div className="flex flex-col gap-2 my-4 w-[500px]">
      <label htmlFor="email" className="font-bold text-black/70">
        {label}:
      </label>
      <Controller
        name={name}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            name={name}
            size="large"
            required
            placeholder={placeholder}
            className="outline outline-1 rounded py-2 outline-gray-400 px-4"
          />
        )}
      />
    </div>
  );
};

export default CustomInput;
