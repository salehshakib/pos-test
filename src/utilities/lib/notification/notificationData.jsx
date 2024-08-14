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
  const diffInSeconds = now.diff(createdAtDate, "second");

  if (diffInSeconds < 60) {
    return diffInSeconds + " sec ago";
  } else if (diffInSeconds < 3600) {
    const minutesAgo = Math.floor(diffInSeconds / 60);
    return minutesAgo + " min ago";
  } else if (diffInSeconds < 86400) {
    const hoursAgo = Math.floor(diffInSeconds / 3600);
    return hoursAgo + " hours ago";
  } else {
    const daysAgo = Math.floor(diffInSeconds / 86400);
    return daysAgo + " days ago";
  }
}
