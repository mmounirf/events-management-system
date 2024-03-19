import { useGetEvents } from "@/hooks/useGetEvents";
import { Container, SimpleGrid } from "@mantine/core";
import type { DatesRangeValue } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useState } from "react";
import EventItem from "./components/EventItem";
import EventsEmptyState from "./components/EventsEmptyState";
import EventsToolbar from "./components/EventsToolbar";

export default function EventsPage() {
	const [dateRange, setDateRange] = useState<DatesRangeValue>([null, null]);
	const [dateQuery, setDateQuery] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const { events, count, loading } = useGetEvents({ dateQuery, searchQuery, dateRange });

	return (
		<Container pos="relative" fluid p={0}>
			<EventsToolbar
				loading={loading}
				onDateQueryChange={setDateQuery}
				onDateRangeChange={setDateRange}
				onSearchQueryChange={setSearchQuery}
			/>
			<Container fluid mt="md">
				<SimpleGrid cols={3}>
					{events.map((event) => (
						<EventItem key={event.id} event={event} />
					))}
				</SimpleGrid>
				<EventsEmptyState
					loading={loading}
					count={count}
					dateQuery={dateQuery}
					dateRange={dateRange}
					searchQuery={searchQuery}
				/>
			</Container>
		</Container>
	);
}
