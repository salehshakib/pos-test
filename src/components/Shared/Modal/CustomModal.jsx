import { Button, Modal } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";

const CustomModal = (props) => {
  const {
    title = "Details",
    openModal,
    hideModal,
    showCloseButton = true,
    children,
    width = 1000,
    footer = false,
    modalStyleProps,
    loading,
    onOk,
    notification = false,
    status,
  } = props ?? {};

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
        styles={{
          header: {
            borderBottom: "2px solid #F0F0F0",
            paddingBottom: "5px",
          },
        }}
        {...modalProps}
      >
        <GlobalUtilityStyle>
          <div className="pt-2 pr-3 max-h-[76vh] overflow-y-auto overflow-x-hidden">
            {children}
          </div>
          {notification &&
            (status === "Pending" ? (
              <div className="w-full flex justify-end items-center gap-3 mt-5 shadow-sm">
                <Button type="" onClick={props.onReject}>
                  Reject
                </Button>
                <Button
                  type="primary"
                  onClick={props.onAccept}
                  loading={props.acceptLoading}
                >
                  Accept
                </Button>
                <Button
                  type="primary"
                  onClick={props.onAcceptAndTransfer}
                  loading={props.acceptAndTransferLoading}
                >
                  Accept & Transfer
                </Button>
              </div>
            ) : status === "Accepted" ? (
              <div className="w-full flex justify-end items-center gap-3 mt-5">
                <Button type="primary" onClick={props.onAcceptAndTransfer}>
                  Transfer
                </Button>
              </div>
            ) : (
              <div className="w-full flex justify-end items-center gap-3 mt-5">
                <Button type="primary" onClick={hideModal}>
                  Close
                </Button>
              </div>
            ))}
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
