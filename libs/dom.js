import { useEffect, useState } from 'react';

export function useLocale() {
  const [locale, setLocale] = useState();

  useEffect(() => {
    setLocale(navigator.language);
  }, []);

  return locale;
}
