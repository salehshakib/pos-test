import { Col, Form, Modal, Row } from 'antd';
import { useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { BiImageAdd } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';

import { fullColLayout, mdColLayout, rowLayout } from '../../layout/FormLayout';
import { cropImage } from '../../utilities/lib/cropImage';
import { GiftCardTypeComponent } from '../ReusableComponent/GiftCardTypeComponent';
import CustomForm from '../Shared/Form/CustomForm';

const FileInput = ({
  imageUrl,
  onImageSelected,
  imageAfterCrop,
  removeImage,
}) => {
  const inputRef = useRef();

  const handleChange = (e) => {
    if (e.target.files[0] && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        onImageSelected(reader.result);
      };
    }
  };

  const onChooseImage = () => {
    inputRef.current.click();
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    removeImage();
  };

  //console.log(imageUrl);

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        style={{ display: 'none' }}
      />

      <div
        className="image-border h-56 overflow-hidden bg-[#FAFAFA] hover:cursor-pointer"
        onClick={onChooseImage}
      >
        {imageAfterCrop ? (
          <>
            <img
              src={imageAfterCrop}
              className="h-56 w-full rounded-md object-contain p-2"
            />
            <button type="button" onClick={handleRemoveImage}>
              <FaTrash
                className="absolute right-2 top-2 cursor-pointer rounded-full bg-white p-1 text-red-500 duration-300 hover:scale-110"
                style={{ fontSize: 23 }}
              />
            </button>
          </>
        ) : imageUrl ? (
          <>
            <img
              src={imageUrl}
              className="h-56 w-full rounded-md object-contain p-2"
            />
            <button type="button" onClick={handleRemoveImage}>
              <FaTrash
                className="absolute right-2 top-2 cursor-pointer rounded-full bg-white p-1 text-red-500 duration-300 hover:scale-110"
                style={{ fontSize: 23 }}
              />
            </button>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <BiImageAdd
              style={{
                fontSize: 25,
              }}
            />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ImageCropper = ({ image, onCropDone, onCropCancle }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <Modal
      title="Image Crop"
      width={600}
      open={image}
      closable={false}
      okText="Done"
      onCancel={onCropCancle}
      onOk={() => onCropDone(croppedArea)}
    >
      <div className="w-100 relative mb-16 h-[50vh]">
        <div className="">
          <Cropper
            image={image}
            aspect={16 / 9}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: {
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
              },
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

const FrontImageCroppper = () => {
  const [image, setImage] = useState(null);
  const [imageAfterCrop, setImageAfterCrop] = useState(null);
  const form = Form.useFormInstance();

  const frontSideUrl = form.getFieldValue('frontImageUrl');

  const onImageSelected = (image) => {
    setImage(image);
  };

  const onCropDone = (imgCroppedArea) => {
    cropImage(image, imgCroppedArea)
      .then((croppedImageUrl) => {
        setImageAfterCrop(croppedImageUrl);
        form.setFieldsValue({ frontImage: croppedImageUrl });
        setImage(null);
      })
      .catch((error) => {
        console.error('Error cropping image:', error);
      })
      .finally(() => {});
  };

  const onCropCancle = () => {
    setImage(null);
    setImageAfterCrop(null);
  };

  const removeImage = () => {
    form.setFieldsValue({ frontImage: null });
    setImage(null);
    setImageAfterCrop(null);
  };

  if (image) {
    return (
      <ImageCropper
        image={image}
        onCropDone={onCropDone}
        onCropCancle={onCropCancle}
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="font-semibold">
        <span className="mr-1 text-red-600">*</span>
        Front Image
      </div>
      <FileInput
        imageUrl={frontSideUrl}
        onImageSelected={onImageSelected}
        imageAfterCrop={imageAfterCrop}
        removeImage={removeImage}
      />
    </div>
  );
};

const BackImageCroppper = () => {
  const [image, setImage] = useState(null);
  const [imageAfterCrop, setImageAfterCrop] = useState(null);
  const form = Form.useFormInstance();

  const backSideUrl = form.getFieldValue('backImageUrl');

  const onImageSelected = (image) => {
    setImage(image);
  };

  const onCropDone = (imgCroppedArea) => {
    cropImage(image, imgCroppedArea)
      .then((croppedImageUrl) => {
        setImageAfterCrop(croppedImageUrl);
        form.setFieldsValue({ backImage: croppedImageUrl });
        setImage(null);
      })
      .catch((error) => {
        console.error('Error cropping image:', error);
      })
      .finally(() => {});
  };

  const onCropCancle = () => {
    setImage(null);
    setImageAfterCrop(null);
  };

  const removeImage = () => {
    form.setFieldsValue({ backImage: null });
    setImage(null);
    setImageAfterCrop(null);
  };

  if (image) {
    return (
      <ImageCropper
        image={image}
        onCropDone={onCropDone}
        onCropCancle={onCropCancle}
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="font-semibold">
        <span className="mr-1 text-red-600">*</span>
        Back Image
      </div>
      <FileInput
        imageUrl={backSideUrl}
        onImageSelected={onImageSelected}
        imageAfterCrop={imageAfterCrop}
        removeImage={removeImage}
      />
    </div>
  );
};

export const GiftCardDesignForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout} className="">
        <Col {...fullColLayout}>
          <GiftCardTypeComponent />
        </Col>
        <Col {...mdColLayout}>
          <FrontImageCroppper />
        </Col>
        <Col {...mdColLayout}>
          <BackImageCroppper />
        </Col>
      </Row>
    </CustomForm>
  );
};
