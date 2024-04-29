import { Modal } from "antd";
import { FaInfoCircle } from "react-icons/fa";

const StatusModal = ({
  statusModal,
  setStatusModal,
  handleStatusUpdate,
  isStatusUpdating,
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
      okText="Yes"
      cancelText="No"
      onOk={handleStatusUpdate}
      onCancel={() => setStatusModal(false)}
      confirmLoading={isStatusUpdating}
      centered
      maskClosable
    >
      Do you want to update your status?
    </Modal>
  );
};

export default StatusModal;
