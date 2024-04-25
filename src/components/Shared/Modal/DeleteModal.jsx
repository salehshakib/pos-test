import { Modal } from "antd";
import { RiErrorWarningFill } from "react-icons/ri";

const DeleteModal = ({
  deleteModal,
  setDeleteModal,
  handleDeleteDepartment,
  isDeleting,
}) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <RiErrorWarningFill
            style={{
              color: "red",
              fontSize: "20px",
            }}
          />
          <span>Delete Department</span>
        </div>
      }
      open={deleteModal}
      okText="Yes"
      cancelText="No"
      onOk={handleDeleteDepartment}
      onCancel={() => setDeleteModal(false)}
      confirmLoading={isDeleting}
      centered
      maskClosable
    >
      Do you want to delete this department?
    </Modal>
  );
};

export default DeleteModal;
