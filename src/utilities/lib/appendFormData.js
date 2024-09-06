import dayjs from 'dayjs';

import { BOOLEAN_KEYS } from '../../assets/data/booleanKeys';

const IGNORED_KEYS = ['has_expired_date', 'delete'];

export const appendToFormData = (data, formData) => {
  function append(key, value) {
    // Skip ignored keys
    if (IGNORED_KEYS.includes(key)) {
      return;
    }

    switch (true) {
      // Handle boolean keys
      case BOOLEAN_KEYS.includes(key):
        if (value.toString() === '1' || value === true) {
          formData.append(key, '1');
        } else {
          formData.append(key, '0');
        }
        break;

      // Handle arrays for attachments and deleteAttachmentIds
      case Array.isArray(value) &&
        (key.includes('attachments') || key.includes('deleteAttachmentIds')):
        value.forEach((item) => formData.append(`${key}[]`, item));
        break;

      // Handle other arrays
      case Array.isArray(value):
        value.forEach((item) => formData.append(`${key}[]`, item));
        break;

      // Handle date fields
      case key.includes('date'):
        formData.append(key, dayjs(value).format('YYYY-MM-DD'));
        break;

      // Default case: append other values
      default:
        if (value) formData.append(key, value);
        break;
    }
  }

  // Iterate through the data object and append to formData
  Object.entries(data).forEach(([key, value]) => {
    append(key, value);
  });
};
