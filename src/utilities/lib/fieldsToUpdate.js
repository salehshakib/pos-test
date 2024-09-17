import dayjs from 'dayjs';

import { BOOLEAN_KEYS } from '../../assets/data/booleanKeys';

const IGNORED_KEYS = [
  'updated_at',
  'deleted_at',
  'created_at',
  'is_active',
  'expired_at',
  'id',
];

export const fieldsToUpdate = (details) => {
  const fieldsToUpdate = Object.keys(details)
    .filter((key) => !IGNORED_KEYS.includes(key))
    .map((key) => {
      let value = details[key];

      switch (true) {
        // Group attachments by label
        case key.includes('attachments'): {
          // Ensure value is an array, otherwise fallback to an empty array
          if (Array.isArray(value)) {
            const groupedAttachments = value.reduce((acc, attachment) => {
              const { label, id, url } = attachment;
              if (!acc[label]) {
                acc[label] = [];
              }
              acc[label].push({ uid: id, url });
              return acc;
            }, {});

            return Object.keys(groupedAttachments).map((label) => ({
              name: label,
              value: groupedAttachments[label],
              errors: '',
            }));
          } else {
            // If value is not an array, skip this case and return nothing
            return [];
          }
        }

        // Handle date fields or keys with '_at'
        case key.includes('date') || key.includes('_at'):
          value = value ? dayjs(value, 'YYYY-MM-DD') : null;
          break;

        // Handle phone number formatting
        case key.includes('phone'):
          value = value ? value.toString().slice(0) : '';
          break;

        // Handle fields with '_id'
        case key.includes('_id'):
          value = value ? value.toString() : '';
          break;

        // Handle boolean fields except 'staff_id'
        case BOOLEAN_KEYS.includes(key) && key !== 'staff_id':
          value = value?.toString() === '1' ? true : false;
          break;

        default:
          break;
      }

      return {
        name: key,
        value: value,
        errors: '',
      };
    })
    .flat(); // Flatten the array to merge any nested arrays

  return fieldsToUpdate;
};

export const updateFieldValues = (fieldData, newFieldData) => {
  return fieldData.map((field) => {
    const newField = newFieldData.find(
      (newField) => newField.name === field.name
    );
    return newField || field;
  });
};
