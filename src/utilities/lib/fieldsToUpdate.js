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
      // if (key.includes("date")) {
      //   value = dayjs(value, "YYYY-MM-DD").toDate();
      // }

      if (key.includes("attachments")) {
        for (var i = 0; i < details[key].length; i++) {
          const obj = details[key][i];

          return {
            name: obj.label,
            value: [
              {
                // url: obj.url,
                url: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
              },
            ],
            errors: "",
          };
        }
      }

      return {
        name: key,
        value: value,
        errors: "",
      };
    });

  return fieldsToUpdate;
};
