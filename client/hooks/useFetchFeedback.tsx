"use client";

import { SERVER_URL } from "@/lib/variables";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";

export const useFetchFeedback = () => {
  const [feedback, setFeedback] = useState<
    {
      feedback: string;
      count: number;
      id: number;
      rating: number;
      comment: string;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedback = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${SERVER_URL}/feedback`);
      const feedbackData = response.data;
      setFeedback(feedbackData);
    } catch (err: unknown) {
      setError(
        axios.isAxiosError(err) && err.response?.data
          ? err.response.data.message
          : "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  return { feedback, loading, error, refetch: fetchFeedback };
};
