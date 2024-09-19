import dayjs from 'dayjs';

export const getDateRange = (segment) => {
  let dateRange = [];
  const today = dayjs();

  switch (segment) {
    case 'Daily':
      dateRange = [today.startOf('day'), today.endOf('day')];
      break;
    case 'Weekly':
      dateRange = [today.startOf('week'), today];
      break;
    case 'Monthly':
      dateRange = [today.startOf('month'), today];
      break;
    case 'Quarterly':
      dateRange = [today.startOf('quarter'), today];
      break;
    case 'Yearly':
      dateRange = [today.startOf('year'), today];
      break;
    default:
      throw new Error('Invalid segment');
  }

  return [dateRange[0].format('YYYY-MM-DD'), dateRange[1].format('YYYY-MM-DD')];
};
