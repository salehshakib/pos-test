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
  }, 800);

  return {
    keyword,
    debounce,
  };
};
