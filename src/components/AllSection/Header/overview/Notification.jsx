import { Badge, Button, Popover, theme, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCurrentUser } from '../../../../redux/services/auth/authSlice';
import {
  useGetAllNotificationQuery,
  useReadNotificationMutation,
} from '../../../../redux/services/notification/notificationApi';
import { categorizeNotifications } from '../../../../utilities/lib/notification/notificationData';
import NotificationComponent from '../../../Notification/Notification';

const hasUnreadNotifications = (notifications) => {
  return notifications.some((notification) => notification.read_at === null);
};

export const Notification = () => {
  const [show, setShow] = useState(false);
  const { token } = theme.useToken();
  const { pathname } = useLocation();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const user = useSelector(useCurrentUser);
  const warehouseId = user?.warehouse_id;

  const { data, refetch, isLoading } = useGetAllNotificationQuery({
    params: {
      warehouse_id: warehouseId,
      user_id: user?.id,
    },
  });

  useEffect(() => {
    refetch();
  }, [pathname, refetch]);

  useEffect(() => {
    if (data) {
      const hasUnread = hasUnreadNotifications(data);
      setShow(hasUnread);
    }
  }, [data]);

  const navigate = useNavigate();

  const { unreadNotifications } = categorizeNotifications(data);

  const onClose = () => {
    setIsPopoverOpen(false);
  };

  const [readNotification] = useReadNotificationMutation();

  const handleReadNotification = async (item) => {
    if (item?.read_at === null) {
      const { data } = await readNotification({
        notification_id: item?.id,
      });

      if (data?.success && item?.data?.stock_request_id) {
        navigate('/inventory/stock-request', {
          state: {
            id: item?.data?.stock_request_id,
          },
        });
        onClose();
      }
    } else {
      if (item?.data?.stock_request_id) {
        navigate('/inventory/stock-request', {
          state: {
            id: item?.data?.stock_request_id,
          },
        });
        onClose();
      }
    }
  };

  const handleNotification = () => {
    setIsPopoverOpen(true);
  };

  const [selected, setSelected] = useState('All');

  const selectedStyleProps = {
    color: '#005FC6',
    backgroundColor: '#DFE9F2',
  };

  const title = () => {
    return (
      <div className="space-y-2">
        <div className="text-start text-[1.4rem] font-bold">Notifications</div>
        <div className="flex items-center gap-2 text-sm">
          <span
            style={selected === 'All' ? selectedStyleProps : {}}
            className={`${selected === 'Unread' ? 'cursor-pointer hover:bg-[#f5f5f5]' : 'cursor-default'} rounded-full px-4 py-1 duration-300`}
            onClick={() => setSelected('All')}
          >
            All
          </span>
          <span
            style={selected === 'Unread' ? selectedStyleProps : {}}
            className={`${selected === 'All' ? 'cursor-pointer hover:bg-[#f5f5f5]' : 'cursor-default'} rounded-full px-4 py-1 duration-300`}
            onClick={() => setSelected('Unread')}
          >
            Unread
          </span>
        </div>
      </div>
    );
  };

  return (
    <Popover
      content={
        <NotificationComponent
          data={selected === 'All' ? data : unreadNotifications}
          handleReadNotification={handleReadNotification}
          loading={isLoading}
        />
      }
      title={title}
      trigger="click"
      placement="bottomRight"
      overlayClassName="rounded-md shadow-xl "
      overlayStyle={{ width: 350 }}
      overlayInnerStyle={{
        maxHeight: '85vh',
        overflowY: 'auto',
        padding: '15px',
        paddingTop: '12px',
      }}
      onOpenChange={onClose}
      open={isPopoverOpen}
      arrow={false}
    >
      <Button
        onClick={handleNotification}
        className="flex items-center justify-center"
      >
        <Tooltip title="Notifications">
          <Badge dot={show}>
            <FaBell
              size={16}
              style={{
                color: token.colorPrimary,
              }}
              className="hover:cursor-pointer"
            />
          </Badge>
        </Tooltip>
      </Button>
    </Popover>
  );
};
