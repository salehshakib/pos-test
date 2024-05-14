export const appendToFormData = (data, formData) => {
  function append(key, value) {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item);
      });
    } else {
      formData.append(key, value);
    }
  }

  Object.entries(data).forEach(([key, value]) => {
    append(key, value);
  });
};
