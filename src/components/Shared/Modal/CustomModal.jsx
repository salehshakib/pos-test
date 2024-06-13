import { Button, Modal } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";

const CustomModal = ({
  title,
  openModal,
  hideModal,
  showCloseButton = true,
  children,
  width = 1000,
  footer = false,
  modalStyleProps,
  loading,
  onOk,
}) => {
  const modalProps = {
    centered: true,
    maskClosable: true,
    ...modalStyleProps,
  };

  if (!footer) {
    modalProps.footer = null;
  }
  return (
    <GlobalUtilityStyle>
      <Modal
        title={title}
        open={openModal}
        onCancel={hideModal}
        width={width}
        okText="Save"
        onOk={onOk}
        confirmLoading={loading}
        {...modalProps}
      >
        <GlobalUtilityStyle>
          {children}
          {showCloseButton && (
            <div className="w-full flex justify-end items-center gap-3 mt-5">
              <Button type="primary" onClick={hideModal}>
                Close
              </Button>
            </div>
          )}
        </GlobalUtilityStyle>
      </Modal>
    </GlobalUtilityStyle>
  );
};
export default CustomModal;
