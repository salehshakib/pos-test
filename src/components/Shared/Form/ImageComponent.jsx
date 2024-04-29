import { Form, Tooltip } from "antd";
import { forwardRef, useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { IoMdSwap } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { GlobalUtilityStyle } from "../../../container/Styled";

const ImageComponent = ({ name, label, required = false, defaultValue }) => {
  const imageRef = useRef(null);
  const [file, setFile] = useState(null);
  const handleImageClick = () => {
    imageRef.current.click();
  };

  const handleImageChange = (event) => {
    setFile(event.target.files[0]);
    // const file = event.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     setFile(e.target.result);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  const handleRemove = () => {
    setFile(null);
  };

  const ImageComponent = forwardRef(function ImageComponent(props, ref) {
    // const [isPreviewVisible, setIsPreviewVisible] = useState(false);

    const openImageInNewTab = () => {
      window.open(props.imageUrl, "_blank");
    };

    return (
      <div className="relative w-full">
        <img
          src={props.imageUrl}
          alt="Image"
          className="rounded-md shadow-md w-full h-60 object-cover"
        />
        <div className="absolute inset-0 flex  gap-3 items-center justify-center opacity-0 hover:opacity-100 transition-opacity ease-in-out duration-300">
          <Tooltip placement="top" title={"Change Photo"}>
            <div
              className="bg-black bg-opacity-50 rounded-full p-2 text-white flex items-center justify-center gap-2 hover:cursor-pointer hover:bg-opacity-70 w-16 "
              onClick={props.onClick}
            >
              <input
                type="file"
                ref={ref}
                onChange={props.onChange}
                style={{ display: "none" }}
              />
              <IoMdSwap className="text-white font-medium" />
              {/* <p className="text-white font-medium mb-0 text-sm">Change Photo</p> */}
            </div>
          </Tooltip>
          <Tooltip placement="top" title={"View Photo"}>
            <div
              className="bg-black bg-opacity-50 rounded-full p-2 text-white flex items-center justify-center gap-2 hover:cursor-pointer hover:bg-opacity-70 w-16 "
              // onClick={() => setIsPreviewVisible(!isPreviewVisible)}
              onClick={openImageInNewTab}
            >
              <FiEye className="text-white font-medium" />
              {/* <p className="text-white font-medium mb-0 text-sm">View Photo</p> */}
            </div>
          </Tooltip>
          <Tooltip placement="top" title={"Remove Photo"}>
            <div
              className="bg-black bg-opacity-50 rounded-full p-2 text-white flex items-center justify-center gap-2 hover:cursor-pointer hover:bg-opacity-70 w-16 "
              // onClick={() => setIsPreviewVisible(!isPreviewVisible)}
              onClick={handleRemove}
            >
              <FaRegTrashAlt className="text-white font-medium" />
              {/* <p className="text-white font-medium mb-0 text-sm">Remove Photo</p> */}
            </div>
          </Tooltip>
        </div>
      </div>
    );
  });

  return (
    <GlobalUtilityStyle>
      <Form.Item
        label={label}
        name={name}
        rules={[{ required: required, message: `Please input ${label}!` }]}
      >
        {file ? (
          <ImageComponent
            imageUrl={defaultValue || URL.createObjectURL(file)}
            ref={imageRef}
            onChange={handleImageChange}
            onClick={handleImageClick}
          />
        ) : (
          <div
            className="flex flex-col mt-2 border-2 border-dashed border-primary p-4 cursor-pointer hover:border-primary-hover gap-2"
            onClick={handleImageClick}
          >
            <input
              type="file"
              ref={imageRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <p className="flex justify-center">
              <IoCloudUploadOutline
                style={{
                  fontSize: "40px",
                  fontWeight: "bold",
                }}
              />
            </p>
            <p className="text-xl text-center">Click this area to upload</p>
            <p className="text-md text-center text-gray-400 px-10">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </div>
        )}
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default ImageComponent;
