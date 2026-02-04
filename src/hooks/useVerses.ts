import { useEffect, useState } from "react";
import type { Verse } from "../types";
import { fetchVerses } from "../api/api";

export const useVerses = () => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadVerses = async () => {
      try {
        setLoading(true);
        const data = await fetchVerses();
        setVerses(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadVerses();
  }, []);

  return { verses, loading, error };
};
