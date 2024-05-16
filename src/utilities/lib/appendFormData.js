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

  console.log(data);
  Object.entries(data).forEach(([key, value]) => {
    // console.log(key, value);

    // if (Array.isArray(value)) {
    //   value.map((item) => {
    //     console.log(key, item);
    //   });
    //   // appendToFormData(value, formData);
    // }
    append(key, value);
  });
};
