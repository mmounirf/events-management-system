import { Tables } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import { showError } from "@/utils/errorNotification";
import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type Response = {
  events: Tables<"events">[];
  count: number;
  loading: boolean;
  error: PostgrestError | null;
};

export function useGetEvents() {
  const [response, setResponse] = useState<Response>({ events: [], count: 0, loading: true, error: null });

  async function getAllEvents() {
    setResponse((prevState) => ({ ...prevState, loading: true }));

    const query = supabase.from("events").select("*", { count: "exact" });

    const { error, data, count } = await query;

    if (error) {
      setResponse({ events: data ?? [], count: count ?? 0, loading: false, error });
      showError({ message: error.message });
    }

    setResponse({ events: data ?? [], count: count ?? 0, loading: false, error });
  }

  useEffect(() => {
    getAllEvents();
  }, []);

  return response;
}
