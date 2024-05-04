import { Button, Modal } from "antd";
import { FaInfoCircle } from "react-icons/fa";
import { GlobalUtilityStyle } from "../../../container/Styled";

const StatusModal = ({
  statusModal,
  hideModal,
  handleStatusUpdate,
  isLoading,
}) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <FaInfoCircle
            style={{
              fontSize: "20px",
            }}
          />
          <span>Status Update</span>
        </div>
      }
      open={statusModal}
      footer={null}
      centered
      maskClosable
    >
      <GlobalUtilityStyle>
        <span>Do you want to update your status?</span>
        <div className="w-full flex justify-end items-center gap-3">
          <Button onClick={hideModal}>No</Button>
          <Button
            type="primary"
            onClick={handleStatusUpdate}
            loading={isLoading}
          >
            Yes
          </Button>
        </div>
      </GlobalUtilityStyle>
    </Modal>
  );
};

export default StatusModal;
