import { useState, useEffect } from "react";

const getParams = <T extends object>(): Partial<T> => {
  // server side rendering
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);

  return new Proxy(params, {
    get(target, prop, receiver) {
      return target.get(prop as string) || undefined;
    },
  }) as T;
};

const useSearchParams = <T extends object = any>(): Partial<T> => {
  const [params, setParams] = useState(getParams());

  useEffect(() => {
    setParams(getParams());
  }, [typeof window === "undefined" ? "once" : window.location.search]);

  return params;
};

export default useSearchParams;
