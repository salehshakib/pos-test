import dayjs from 'dayjs';

import { BOOLEAN_KEYS, TIME_KEYS } from '../../assets/data/booleanKeys';

const IGNORED_KEYS = [
  'updated_at',
  'deleted_at',
  'created_at',
  'is_active',
  'expired_at',
  'id',
];

export const fieldsToUpdate = (details) => {
  return Object.keys(details)
    .filter((key) => !IGNORED_KEYS.includes(key))
    .map((key) => {
      let value = details[key];

      if (key.includes('attachments')) {
        // Group attachments by label
        const groupedAttachments = value.reduce((acc, { label, id, url }) => {
          acc[label] = acc[label] || [];
          acc[label].push({ uid: id, url });
          return acc;
        }, {});

        return Object.keys(groupedAttachments).map((label) => ({
          name: label,
          value: groupedAttachments[label],
          errors: '',
        }));
      }

      // Handle date fields or keys with '_at'
      if (
        (key.includes('date') || key.includes('_at')) &&
        !key.includes('need_attachment')
      ) {
        value = dayjs(value, 'YYYY-MM-DD');
      }

      // Handle phone number formatting
      if (key.includes('phone')) {
        value = value?.toString()?.slice(0);
      }

      // Handle fields with '_id'
      if (key.includes('_id')) {
        value = value?.toString();
      }

      // Handle boolean fields except 'staff_id'
      if (BOOLEAN_KEYS.includes(key) && key !== 'staff_id') {
        value = value.toString() === '1';
      }

      if (TIME_KEYS.includes(key)) {
        value = dayjs(value, 'HH:mm:ss');
      }

      return {
        name: key,
        value,
        errors: '',
      };
    })
    .flat(); // Flatten any nested arrays from the attachment handling
};

export const updateFieldValues = (fieldData, newFieldData) => {
  const fieldMap = new Map(
    newFieldData.map(({ name, value, errors }) => [name, { value, errors }])
  );

  return fieldData.map((field) => ({
    ...field,
    ...(fieldMap.get(field.name) || {}),
  }));
};
