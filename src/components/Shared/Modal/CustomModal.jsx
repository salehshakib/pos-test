import { Button, Modal } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";

const props = {
  footer: null,
  centered: true,
  maskClosable: true,
};

const CustomModal = ({
  title,
  openModal,
  hideModal,
  handleSubmit,
  isLoading,
}) => {
  return (
    <GlobalUtilityStyle>
      <Modal title={title} open={openModal} onCancel={hideModal} {...props}>
        <GlobalUtilityStyle>
          <span> Do you want to delete this department?</span>
          <div className="w-full flex justify-end items-center gap-3">
            <Button onClick={hideModal}>No</Button>
            <Button type="primary" onClick={handleSubmit} loading={isLoading}>
              Yes
            </Button>
          </div>
        </GlobalUtilityStyle>
      </Modal>
    </GlobalUtilityStyle>
  );
};
export default CustomModal;
