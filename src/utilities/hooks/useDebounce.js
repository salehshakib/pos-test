import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";

export const useCustomDebounce = () => {
  const [keyword, setKeyword] = useState();

  const debounce = useDebouncedCallback(async (value) => {
    if (value.trim() !== "") {
      setKeyword(value);
    } else {
      setKeyword(null);
    }
  }, 1000);

  //   const debounce = (value) => {
  //     console.log(value);
  //     debounceCallback(value);
  //   };

  //   console.log(first)

  return {
    keyword,
    debounce,
  };
};
