// const SingleNotification = ({ data, handleReadNotification }) => {
import { Skeleton, theme } from "antd";
import warehouseLogo from "../../assets/data/warehouseLogo";
import {
  categorizeNotificationsByDate,
  getHoursAgo,
} from "../../utilities/lib/notification/notificationData";

const SingleNotificationComponent = ({ item, handleReadNotification }) => {
  const { token } = theme.useToken();

  return (
    <div
      onClick={() => handleReadNotification(item)}
      // className={`hover:cursor-pointer hover:bg-[#f5f5f5] duration-300 p-2 rounded-lg  ${item?.read_at !== null ? "bg-[#f5f5f5]" : "hover:shadow-md"}`}

      className="hover:cursor-pointer hover:bg-[#f5f5f5] duration-300 p-2 rounded-lg hover:shadow-md"
    >
      <div className="flex items-start gap-2 w-full ">
        <img src={warehouseLogo} className="w-12 rounded-full shadow-md" />
        <div className="flex justify-between items-center w-full">
          <div className="font-medium flex flex-col gap-1 ">
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
              className="rounded-full w-2 h-2"
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

const NotificationComponent = ({ data, handleReadNotification }) => {
  if (!data) {
    return <Skeleton paragraph avatar />;
  }

  const { todayNotifications, olderNotifications } =
    categorizeNotificationsByDate(data);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-1 ">
        <span className="text-base font-semibold px-1">New</span>
        {todayNotifications?.length > 0 &&
          todayNotifications?.map((item) => {
            return (
              <SingleNotificationComponent
                key={item?.id}
                item={item}
                handleReadNotification={handleReadNotification}
              />
            );
          })}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-base font-semibold px-1">Earlier</span>
        {olderNotifications?.length > 0 &&
          olderNotifications?.map((item) => {
            return (
              <SingleNotificationComponent
                key={item?.id}
                item={item}
                handleReadNotification={handleReadNotification}
              />
            );
          })}
      </div>
    </div>
  );
};

export default NotificationComponent;
