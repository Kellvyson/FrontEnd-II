import { useEffect, useState } from "react";
import type { Letter } from "../types";
import { fetchLetters } from "../api/api";

export const useLetters = () => {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadLetters = async () => {
      try {
        setLoading(true);
        const data = await fetchLetters();
        setLetters(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadLetters();
  }, []);

  return { letters, loading, error };
};
