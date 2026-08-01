"use client";

import { useState } from "react";

export function useApiState<T>(initial: T) {
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return { data, setData, loading, setLoading, error, setError };
}
