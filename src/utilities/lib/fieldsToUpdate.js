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

      console.log(key);

      if (key.includes("attachments")) {
        const attachmentArray = details[key].map((attachment) => ({
          uid: attachment.id,
          url: attachment.url,
        }));

        return {
          name: key,
          value: attachmentArray,
          errors: "",
        };
      }

      return {
        name: key,
        value: value,
        errors: "",
      };
    });

  return fieldsToUpdate;
};
