import { Button, Modal } from 'antd';

import { GlobalUtilityStyle } from '../../../container/Styled';

const CustomModal = (props) => {
  const {
    title = 'Details',
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
    transferStatus,
    requestStatus,
    handlePrint,
    handleDownload,
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
            borderBottom: '2px solid #F0F0F0',
            paddingBottom: '5px',
          },
        }}
        {...modalProps}
      >
        <GlobalUtilityStyle>
          <div className="max-h-[75vh] overflow-y-auto overflow-x-hidden">
            {children}
          </div>
          {notification &&
          transferStatus === 'Pending' &&
          requestStatus === 'Pending' ? (
            <div className="mt-5 flex w-full items-center justify-end gap-3 shadow-sm">
              <Button
                type=""
                onClick={props.onReject}
                loading={props.rejectLoading}
                disabled={
                  props.rejectLoading ||
                  props.acceptLoading ||
                  props.acceptAndTransferLoading
                }
              >
                Reject
              </Button>
              <Button
                type="primary"
                onClick={props.onAccept}
                loading={props.acceptLoading}
                disabled={
                  props.rejectLoading ||
                  props.acceptLoading ||
                  props.acceptAndTransferLoading
                }
              >
                Accept
              </Button>
              <Button
                type="primary"
                onClick={props.onAcceptAndTransfer}
                loading={props.acceptAndTransferLoading}
                disabled={
                  props.rejectLoading ||
                  props.acceptLoading ||
                  props.acceptAndTransferLoading
                }
              >
                Accept & Transfer
              </Button>
            </div>
          ) : transferStatus === 'Pending' && requestStatus === 'Accepted' ? (
            <div className="mt-5 flex w-full items-center justify-end gap-3">
              <Button type="primary" onClick={hideModal}>
                Close
              </Button>
              {transferStatus !== 'Transferred' && (
                <Button
                  type="primary"
                  onClick={props.onTransfer}
                  loading={props.transferLoading}
                  disabled={
                    props.rejectLoading ||
                    props.acceptLoading ||
                    props.transferLoading ||
                    props.acceptAndTransferLoading
                  }
                >
                  Transfer
                </Button>
              )}
            </div>
          ) : (
            <></>
          )}

          {showCloseButton && (
            <div className="mt-5 flex w-full items-center justify-end gap-3">
              {handlePrint && (
                <Button type="primary" onClick={handlePrint}>
                  Print
                </Button>
              )}
              {handleDownload && (
                <Button type="primary" onClick={handleDownload}>
                  Donwload
                </Button>
              )}
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
