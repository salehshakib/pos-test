import dayjs from 'dayjs';

const BOOLEAN_KEYS = [
  'has_seo',
  'have_access',
  'is_send_email',
  'has_stock',
  'has_different_price',
  'has_promotion',
  'has_expired_date',
  'need_attachment',
];

export const fieldsToUpdate = (details) => {
  const fieldsToUpdate = Object.keys(details)
    .filter(
      (key) =>
        !key.includes('updated_at') &&
        !key.includes('deleted_at') &&
        !key.includes('created_at') &&
        !key.includes('is_active') &&
        !key.includes('expired_at') &&
        key !== 'id'
    )
    .map((key) => {
      let value = details[key];

      if (key.includes('attachments')) {
        // Group attachments by their label
        const groupedAttachments = value.reduce((acc, attachment) => {
          const { label, id, url } = attachment;
          if (!acc[label]) {
            acc[label] = [];
          }
          acc[label].push({ uid: id, url });
          return acc;
        }, {});

        // Convert the grouped attachments to the desired format
        return Object.keys(groupedAttachments).map((label) => ({
          name: label,
          value: groupedAttachments[label],
          errors: '',
        }));
      }

      if (key.includes('date') || key.includes('_at')) {
        value = dayjs(value, 'YYYY-MM-DD');
      }

      if (key.includes('phone')) {
        value = value?.toString()?.slice(0);
      }

      if (key.includes('_id')) {
        value = value?.toString();
      }

      if (BOOLEAN_KEYS.includes(key) && key !== 'staff_id') {
        value = value.toString() === '1' ? true : false;
      }

      return {
        name: key,
        value: value,
        errors: '',
      };
    })
    .flat(); // Flatten the array to merge nested arrays

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
