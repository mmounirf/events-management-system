import type { Tables } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import { showError } from "@/utils/errorNotification";
import type { DatesRangeValue } from "@mantine/dates";
import type { PostgrestError } from "@supabase/supabase-js";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

type Response = {
	events: Tables<"events">[];
	count: number;
	loading: boolean;
	error: PostgrestError | null;
};

type GetEventsProps = {
	searchQuery: string;
	dateQuery: string;
	dateRange: DatesRangeValue;
};

export function useGetEvents({ searchQuery, dateQuery, dateRange }: GetEventsProps) {
	const [response, setResponse] = useState<Response>({ events: [], count: 0, loading: true, error: null });

	const getAllEvents = useCallback(async () => {
		setResponse((prevState) => ({ ...prevState, loading: true }));

		const query = supabase.from("events").select("*", { count: "exact" });

		// Search query
		if (searchQuery !== "") {
			query.textSearch("title", searchQuery);
		}

		// Date query
		const dateQueryFilter = dateQuery === "past" ? "lt" : dateQuery === "upcoming" ? "gt" : undefined;
		if (dateQueryFilter) {
			query[dateQueryFilter]("start", dayjs());
		}

		// Date range filter
		if (dateRange && dateRange[0] !== null && dateRange[1] !== null) {
			query.gte("start", dateRange[0].toISOString()).lte("end", dateRange[1].toISOString());
		}

		const { error, data, count } = await query;

		if (error) {
			setResponse({ events: data ?? [], count: count ?? 0, loading: false, error });
			showError({ message: error.message });
		}

		setResponse({ events: data ?? [], count: count ?? 0, loading: false, error });
	}, [dateQuery, searchQuery, dateRange]);

	useEffect(() => {
		getAllEvents();
	}, [getAllEvents]);

	return response;
}
