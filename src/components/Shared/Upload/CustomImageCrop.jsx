import ImgCrop from "antd-img-crop";
import React from "react";
import CustomUploader from "./CustomUploader";

const CustomImageCrop = (props) => {
  return (
    <ImgCrop>
      <CustomUploader {...props} />
    </ImgCrop>
  );
};

export default CustomImageCrop;
