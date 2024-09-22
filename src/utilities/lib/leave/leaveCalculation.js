export function calculateLeaveDays(
  leaveStartDate,
  leaveEndDate,
  leaveDuration,
  leaveStartTime,
  leaveEndTime
) {
  const startDate = new Date(leaveStartDate);
  const endDate = new Date(leaveEndDate);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return 'Invalid date(s)';
  }

  const dayDifference = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
  );

  // Handle leave in hours
  if (leaveDuration === 'hours') {
    const timeDifference = calculateTimeDifference(
      leaveStartTime,
      leaveEndTime
    );

    if (timeDifference === null) {
      return 'Invalid time(s)';
    }

    const { hours, minutes } = timeDifference;
    return `${hours} H(s) ${minutes} Min(s)`;
  }

  // Handle half-day leave
  if (leaveDuration === 'half-day') {
    return 'Half Day';
  }

  // Handle full-day leave
  return dayDifference < 2 ? 'One Day' : `${dayDifference} Days`;
}

// Helper function to calculate time difference
function calculateTimeDifference(startTime, endTime) {
  const start = parseTime(startTime);
  const end = parseTime(endTime);

  if (!start || !end) {
    return null;
  }

  let timeDiffInMillis = end.getTime() - start.getTime();

  // If the time difference is negative, add 24 hours (in milliseconds)
  if (timeDiffInMillis < 0) {
    timeDiffInMillis += 24 * 60 * 60 * 1000;
  }

  const totalMinutes = Math.floor(timeDiffInMillis / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}

// Helper function to parse time in 'HH:mm' or 'HH:mm:ss' format
function parseTime(timeString) {
  const [hours, minutes, seconds = 0] = timeString.split(':').map(Number);

  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    isNaN(seconds) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59 ||
    seconds < 0 ||
    seconds > 59
  ) {
    return null; // Invalid time value
  }

  const time = new Date();
  time.setHours(hours, minutes, seconds, 0);
  return time;
}

export function formatTimeTo12Hour(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);

  if (isNaN(hours) || isNaN(minutes)) {
    return 'Invalid time';
  }

  const period = hours >= 12 ? 'PM' : 'AM';
  const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${adjustedHours}:${formattedMinutes} ${period}`;
}
