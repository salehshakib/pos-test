import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export const useCustomDebounce = () => {
  const [keyword, setKeyword] = useState(null);

  const debounce = useDebouncedCallback(async (value) => {
    if (value.trim() !== '') {
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
