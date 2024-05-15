import { Button, Modal } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";

const modalProps = {
  footer: null,
  centered: true,
  maskClosable: true,
  width: 1000,
};

const CustomModal = ({ title, openModal, hideModal, children }) => {
  console.log(title);
  return (
    <GlobalUtilityStyle>
      <Modal
        title={title}
        open={openModal}
        onCancel={hideModal}
        {...modalProps}
      >
        <GlobalUtilityStyle>
          {children}
          <div className="w-full flex justify-end items-center gap-3 mt-5">
            <Button type="primary" onClick={hideModal}>
              Close
            </Button>
          </div>
        </GlobalUtilityStyle>
      </Modal>
    </GlobalUtilityStyle>
  );
};
export default CustomModal;
