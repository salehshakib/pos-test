import { Skeleton, theme } from 'antd';
import { PiWarehouse } from 'react-icons/pi';

import {
  categorizeNotificationsByDate,
  getHoursAgo,
} from '../../utilities/lib/notification/notificationData';

const SingleNotificationComponent = ({ item, handleReadNotification }) => {
  const { token } = theme.useToken();

  return (
    <div
      onClick={() => handleReadNotification(item)}
      className="rounded-lg p-2 duration-300 hover:cursor-pointer hover:bg-[#f5f5f5] hover:shadow-md"
    >
      <div className="flex w-full items-center gap-2">
        {/* <img src={warehouseLogo} className="w-12 rounded-full shadow-md" /> */}
        <div
          className="border rounded-full p-2"
          style={{ borderColor: token.colorPrimary }}
        >
          <PiWarehouse size={28} />
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-1 font-medium">
            <div>{item?.data?.message}</div>
            <div
              className="text-xs"
              style={{
                color: token.colorPrimary,
              }}
            >
              {getHoursAgo(item?.created_at)}
            </div>
          </div>
          {item?.read_at === null && (
            <div
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: token.colorPrimary,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const NotificationComponent = ({ data, handleReadNotification, loading }) => {
  if (loading) {
    return <Skeleton paragraph avatar />;
  }

  const { todayNotifications, olderNotifications } =
    categorizeNotificationsByDate(data);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        {todayNotifications?.length > 0 && (
          <>
            <span className="px-1 text-base font-semibold">New</span>
            {todayNotifications.map((item) => (
              <SingleNotificationComponent
                key={item?.id}
                item={item}
                handleReadNotification={handleReadNotification}
              />
            ))}
          </>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {olderNotifications?.length > 0 && (
          <>
            <span className="px-1 text-base font-semibold">Earlier</span>
            {olderNotifications.map((item) => (
              <SingleNotificationComponent
                key={item?.id}
                item={item}
                handleReadNotification={handleReadNotification}
              />
            ))}
          </>
        )}
      </div>

      {!data && (
        <div className="pb-5 text-center text-base">
          No notifications available
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
