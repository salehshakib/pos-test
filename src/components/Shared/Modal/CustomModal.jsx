import { Button, Modal } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";

const modalProps = {
  footer: null,
  centered: true,
  maskClosable: true,
};

const CustomModal = ({
  title,
  openModal,
  hideModal,
  showCloseButton = true,
  children,
  width = 1000,
}) => {
  return (
    <GlobalUtilityStyle>
      <Modal
        title={title}
        open={openModal}
        onCancel={hideModal}
        width={width}
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
