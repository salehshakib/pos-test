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

  // Calculate day difference between start and end dates
  const timeDifference = endDate.getTime() - startDate.getTime();
  const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  // Handle leave in hours
  if (leaveDuration === 'hours') {
    const startTime = parseTime(leaveStartTime);
    const endTime = parseTime(leaveEndTime);

    if (!startTime || !endTime) {
      return 'Invalid time(s)';
    }

    let timeDiffInMillis = endTime.getTime() - startTime.getTime();

    // If the time difference is negative, add 24 hours (in milliseconds)
    if (timeDiffInMillis < 0) {
      timeDiffInMillis += 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    }

    // Calculate the difference in hours and minutes
    const totalMinutes = Math.floor(timeDiffInMillis / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // Return result in 'X Hours Y Minutes' format
    return `${hours} H(s) ${minutes} Min(s)`;
  }

  // Handle half-day leave
  if (leaveDuration === 'half-day') {
    return 'Half Day';
  }

  // Handle full-day leave
  if (dayDifference < 2) {
    return 'One Day';
  }

  return dayDifference + ' Days';
}

// Helper function to parse time in 'HH:mm' or 'HH:mm:ss' format
function parseTime(timeString) {
  const timeParts = timeString.split(':').map(Number);

  if (timeParts.length < 2 || timeParts.length > 3 || timeParts.some(isNaN)) {
    return null; // Invalid time string
  }

  const hours = timeParts[0];
  const minutes = timeParts[1];
  const seconds = timeParts.length === 3 ? timeParts[2] : 0; // Default seconds to 0 if not provided

  if (
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
  time.setHours(hours, minutes, seconds, 0); // Set hours, minutes, and seconds to current day
  return time;
}

export function formatTimeTo12Hour(timeString) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    return 'Invalid time';
  }

  // Determine AM/PM and adjust hours for 12-hour format
  const period = hours >= 12 ? 'PM' : 'AM';
  let adjustedHours = hours % 12 || 12; // Convert 0 to 12 for midnight and handle 12-hour format

  // Format minutes (don't need seconds for this display)
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${adjustedHours}:${formattedMinutes} ${period}`;
}
