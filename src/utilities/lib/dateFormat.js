import dayjs from 'dayjs';

export function formatDate(date, format) {
  return date ? dayjs(date).format(format) : 'N/A';
}
