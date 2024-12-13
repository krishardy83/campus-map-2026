import { useEffect, useState } from "react";

export default function useData<T>(url: string) {
  const [state, setState] = useState<{
    data: T | null;
    error: boolean;
    loading: boolean;
  }>({
    data: null,
    error: false,
    loading: false,
  });

  useEffect(() => {
    let ignore = false;
    setState((previous) => ({ ...previous, loading: true, error: false }));

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!ignore) {
          setState({ data, error: false, loading: false });
        }
      })
      .catch(() => {
        setState({ data: null, error: true, loading: false });
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return state;
}
