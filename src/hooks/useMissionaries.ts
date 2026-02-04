import { useEffect, useState } from "react";
import type { Missionary } from "../types";
import { fetchMissionaries } from "../api/api";

export const useMissionaries = () => {
  const [missionaries, setMissionaries] = useState<Missionary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadMissionaries = async () => {
      try {
        setLoading(true);
        const data = await fetchMissionaries();
        setMissionaries(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadMissionaries();
  }, []);

  return { missionaries, loading, error };
};
