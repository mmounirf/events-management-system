import coverFallbackImage from "@/assets/cover-fallback.jpg";
import TextEditorRawContent from "@/components/TextEditor/TextEditorRawContent";
import type { Tables } from "@/lib/database.types";
import { getDateTime, getDiff, timeFromNow } from "@/utils/datetimeHelpers";
import {
	Badge,
	Box,
	Card,
	Divider,
	Flex,
	Group,
	Image,
	Spoiler,
	Stack,
	Text,
	ThemeIcon,
	Title,
	rem,
} from "@mantine/core";
import { IconArrowRight, IconCalendarEvent, IconCalendarTime, IconHourglass, IconMapPin } from "@tabler/icons-react";
import dayjs from "dayjs";

export default function EventItem({ event }: { event: Tables<"events"> }) {
	const { title, start, end, description, location, logo, cover } = event;

	// <Text size="sm" c="dimmed">{getDiff(event.end, event.start) > 1 ? `${getDiff(event.end, event.start)} days event` : '1 day event'}</Text>

	// <Group>
	//     <IconHourglass color="var(--mantine-color-dimmed)" style={{ width: rem(18), height: rem(18) }} stroke={2} />
	//     <Text size="sm" c="dimmed">{timeFromNow(event.start)}</Text>
	// </Group>

	const isSingleDayEvent = dayjs(start).isSame(dayjs(end), "day");

	const getEventDate = () => {
		if (isSingleDayEvent) {
			return getDateTime(start).fullDate;
		}

		return (
			<Group gap={0} align="center">
				<Text size="sm" c="dimmed">
					{getDateTime(start).fullDate}
				</Text>
				<IconArrowRight color="var(--mantine-color-dimmed)" style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
				<Text size="sm" c="dimmed">
					{getDateTime(end).fullDate}
				</Text>
			</Group>
		);
	};

	return (
		<Card withBorder p="md">
			<Card.Section pos="relative">
				<Badge variant="dot" size="sm" pos="absolute" inset="20px 20px 0 auto">
					{timeFromNow(start)}
				</Badge>

				<Image loading="lazy" src={cover} alt={title} height={150} fit="cover" fallbackSrc={coverFallbackImage} />
			</Card.Section>
			<Card.Section pos="relative" h={40}>
				<Flex
					style={{
						boxShadow: "var(--mantine-shadow-md)",
						borderRadius: "100%",
						background: "var(--mantine-color-body)",
					}}
					w={80}
					h={80}
					m="auto"
					pos="absolute"
					inset="-40px 0 0 0"
					align="center"
					justify="center"
				>
					{logo === null ? (
						<ThemeIcon size="60" radius="100%">
							<IconCalendarEvent stroke={1.5} style={{ width: rem(40), height: rem(40) }} />
						</ThemeIcon>
					) : (
						<Image h={60} w={60} loading="lazy" src={logo} fit="contain" />
					)}
				</Flex>
			</Card.Section>
			<Card.Section>
				<Stack gap="xs">
					<Title order={2} ta="center">
						{title}
					</Title>
					<Divider />
					<Stack px="md" gap="xs">
						<Group gap="xs" fz="sm" c="dimmed">
							<IconHourglass style={{ width: rem(20), height: rem(20) }} />
							{getDiff(event.end, event.start) > 1 ? `${getDiff(event.end, event.start)} days event` : "1 day event"}
						</Group>

						<Group gap="xs" fz="sm" c="dimmed">
							<IconCalendarTime style={{ width: rem(20), height: rem(20) }} />
							{getEventDate()}
						</Group>

						<Group gap="xs" fz="sm" c="dimmed">
							<IconMapPin style={{ width: rem(20), height: rem(20) }} />
							{location}
						</Group>
					</Stack>
					<Divider />

					<Box p="md" pt="0">
						<Spoiler maxHeight={100} showLabel="Read more" hideLabel="Show less" c="dimmed">
							<TextEditorRawContent content={description} />
						</Spoiler>
					</Box>
				</Stack>
			</Card.Section>
		</Card>
	);
}
