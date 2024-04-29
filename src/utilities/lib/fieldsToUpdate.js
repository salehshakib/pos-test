import dayjs from "dayjs";

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
      if (key.includes("date")) {
        value = dayjs(value, "YYYY-MM-DD").toDate();
      }

      return {
        name: key,
        value: value,
        errors: "",
      };
    });

  return fieldsToUpdate;
};
