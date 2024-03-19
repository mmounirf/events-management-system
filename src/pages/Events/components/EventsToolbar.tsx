import { ActionIcon, Flex, Group, Loader, Paper, SegmentedControl, TextInput, rem } from "@mantine/core";
import { DatePickerInput, type DatesRangeValue } from "@mantine/dates";
import { useDebouncedValue } from "@mantine/hooks";
import { IconCalendarEvent, IconSearch, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const dateQueries = [
	{ label: "All", value: "all" },
	{ label: "Upcoming", value: "upcoming" },
	{ label: "Past", value: "past" },
];

type EventsToolbarProps = {
	loading: boolean;
	onDateRangeChange: (dateRange: DatesRangeValue) => void;
	onDateQueryChange: (dateQuery: string) => void;
	onSearchQueryChange: (searchQuery: string) => void;
};

export default function EventsToolbar({
	loading,
	onDateRangeChange,
	onDateQueryChange,
	onSearchQueryChange,
}: EventsToolbarProps) {
	const [dateRange, setDateRange] = useState<DatesRangeValue>([null, null]);
	const [dateQuery, setDateQuery] = useState(dateQueries[0].value);
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 500);
	const debounceOrInstant = searchQuery === "" ? searchQuery : debouncedSearchQuery;

	const dateStart = dateRange[0] ? dayjs(dateRange[0]).format("DD.MM.YYYY") : "Start date";
	const dateEnd = dateRange[1] ? dayjs(dateRange[1]).format("DD.MM.YYYY") : "End date";

	useEffect(() => {
		onDateRangeChange(dateRange);
	}, [dateRange, onDateRangeChange]);

	useEffect(() => {
		onSearchQueryChange(debounceOrInstant);
	}, [debounceOrInstant, onSearchQueryChange]);

	useEffect(() => {
		onDateQueryChange(dateQuery);
	}, [dateQuery, onDateQueryChange]);

	return (
		<Paper
			style={{ zIndex: 10 }}
			top={60}
			pos="sticky"
			shadow="lg"
			p="md"
			radius="0 0 var(--mantine-radius-lg) var(--mantine-radius-lg)"
		>
			<Flex align="center" wrap="nowrap" justify="space-between">
				<TextInput
					variant="filled"
					flex="0.5"
					size="md"
					placeholder="Search events by title"
					rightSectionWidth={42}
					leftSection={
						loading ? <Loader size="xs" /> : <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
					}
					onChange={({ target }) => setSearchQuery(target.value)}
					value={searchQuery}
					rightSection={
						searchQuery !== "" && (
							<ActionIcon onClick={() => setSearchQuery("")} size="xs" variant="transparent" color="gray">
								<IconX />
							</ActionIcon>
						)
					}
				/>

				<Group>
					<DatePickerInput
						leftSection={<IconCalendarEvent stroke={1.5} />}
						valueFormat="DD.MM.YYYY"
						miw={230}
						variant="filled"
						type="range"
						clearable
						placeholder={`${dateStart} - ${dateEnd}`}
						value={dateRange}
						onChange={setDateRange}
					/>
					<SegmentedControl data={dateQueries} value={dateQuery} onChange={setDateQuery} />
				</Group>
			</Flex>
		</Paper>
	);
}
