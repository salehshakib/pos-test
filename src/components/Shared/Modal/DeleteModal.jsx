import { Button, Modal } from "antd";
import { RiErrorWarningFill } from "react-icons/ri";
import { GlobalUtilityStyle } from "../../../container/Styled";

const DeleteModal = ({
  deleteModal,
  hideModal,
  handleDeleteDepartment,
  isLoading,
}) => {
  return (
    <GlobalUtilityStyle>
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
        footer={null}
        centered
        maskClosable
      >
        <GlobalUtilityStyle>
          <span> Do you want to delete this department?</span>
          <div className="w-full flex justify-end items-center gap-3">
            <Button onClick={hideModal}>No</Button>
            <Button
              type="primary"
              onClick={handleDeleteDepartment}
              loading={isLoading}
            >
              Yes
            </Button>
          </div>
        </GlobalUtilityStyle>
      </Modal>
    </GlobalUtilityStyle>
  );
};

export default DeleteModal;
