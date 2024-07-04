import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

const useSearchParams = () => {

  const location = useLocation();

  const searchParams = useMemo(() => {

    const params = new URLSearchParams(location.search);

    const entries = {};

    for (const [key, value] of params.entries()) {
      entries[key] = Number(value) || value;
    }

    return entries;

  }, [location]);

  return searchParams;
}

export { useSearchParams }
