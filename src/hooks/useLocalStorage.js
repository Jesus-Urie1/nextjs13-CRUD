import { useState, useEffect } from "react";
export const useLocalStorage = (key, initialState) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const localData = localStorage.getItem(key);
    if (localData) setState(JSON.parse(localData));
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};
