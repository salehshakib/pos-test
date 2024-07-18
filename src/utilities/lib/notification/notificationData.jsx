import dayjs from "dayjs";

export function categorizeNotifications(notifications) {
  if (!notifications) return [];

  const readNotifications = [];
  const unreadNotifications = [];

  notifications.forEach((notification) => {
    if (notification.read_at) {
      readNotifications.push(notification);
    } else {
      unreadNotifications.push(notification);
    }
  });

  return { readNotifications, unreadNotifications };
}

export function categorizeNotificationsByDate(notifications) {
  if (!notifications) return [];

  const today = new Date().toISOString().slice(0, 10);
  const todayNotifications = [];
  const olderNotifications = [];

  notifications.forEach((notification) => {
    const notificationDate = notification.created_at.slice(0, 10);
    if (notificationDate === today) {
      todayNotifications.push(notification);
    } else {
      olderNotifications.push(notification);
    }
  });

  return { todayNotifications, olderNotifications };
}

export function getHoursAgo(created_at) {
  const now = dayjs();
  const createdAtDate = dayjs(created_at);
  const hoursAgo = now.diff(createdAtDate, "hour");

  if (hoursAgo >= 24) {
    const daysAgo = Math.floor(hoursAgo / 24);
    return daysAgo + " days ago";
  } else {
    return hoursAgo + " hours ago";
  }
}
