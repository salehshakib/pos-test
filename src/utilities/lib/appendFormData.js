export const appendToFormData = (data, formData) => {
  console.log(data);
  function append(key, value) {
    console.log(key);
    if (Array.isArray(value) && key.includes("attachments")) {
      value.forEach((item) => {
        formData.append(`${key}[]`, item);
      });
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item);
      });
    } else if (value) {
      formData.append(key, value);
    }
  }

  Object.entries(data).forEach(([key, value]) => {
    append(key, value);
  });
};
