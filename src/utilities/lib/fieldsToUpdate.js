export const fieldsToUpdate = (details) => {
  const fieldsToUpdate = Object.keys(details)
    .filter(
      (key) =>
        !key.includes("updated_at") &&
        !key.includes("deleted_at") &&
        !key.includes("created_at") &&
        !key.includes("is_active") &&
        key !== "id"
    )
    .map((key) => {
      let value = details[key];

      if (key.includes("attachments")) {
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
          errors: "",
        }));
      }

      return {
        name: key,
        value: value,
        errors: "",
      };
    })
    .flat(); // Flatten the array to merge nested arrays

  return fieldsToUpdate;
};
