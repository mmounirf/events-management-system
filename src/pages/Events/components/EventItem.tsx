import { TextEditorContent } from "@/components/TextEditor";
import { Tables } from "@/lib/database.types";
import { getDateTime } from "@/utils/datetimeHelpers";
import { Avatar, Flex, Group, Paper, Text, Title, rem } from "@mantine/core";
import { IconArrowRight, IconCalendarEvent, IconMapPin } from "@tabler/icons-react";

export default function EventItem({ event }: { event: Tables<'events'> }) {

    const { title, start, end, description, is_all_day } = event;

    const { year, month, dayOfMonth, dayOfWeek, hour, minute, ampm, fullDate } = getDateTime(start);



    // <Text size="sm" c="dimmed">{getDiff(event.end, event.start) > 1 ? `${getDiff(event.end, event.start)} days event` : '1 day event'}</Text>

    // <Group>
    //     <IconHourglass color="var(--mantine-color-dimmed)" style={{ width: rem(18), height: rem(18) }} stroke={2} />
    //     <Text size="sm" c="dimmed">{timeFromNow(event.start)}</Text>
    // </Group>


    const getEventDate = () => {
        if (is_all_day) {
            return (
                <Group gap={0} align="center">
                    <IconCalendarEvent color="var(--mantine-color-dimmed)" style={{ width: rem(18), height: rem(18) }} stroke={2} />
                    <Text size="sm" c="dimmed">{getDateTime(event.start).fullDate}</Text>
                </Group>
            )
        }

        return (
            <Group gap={0} align="center">
                <IconCalendarEvent color="var(--mantine-color-dimmed)" style={{ width: rem(18), height: rem(18) }} stroke={2} />
                <Text size="sm" c="dimmed">{getDateTime(event.start).fullDate}</Text>
                <IconArrowRight color="var(--mantine-color-dimmed)" style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                <Text size="sm" c="dimmed">{getDateTime(event.end).fullDate}</Text>
            </Group>
        )
    };


    return (
        <Paper withBorder p="md">

            <Group align="center">
                <Avatar size="xl" />
                <Flex direction="column">

                    <Title>{title}</Title>
                    <Group gap={0} align="center">
                        <IconMapPin color="var(--mantine-color-dimmed)" style={{ width: rem(18), height: rem(18) }} stroke={2} />
                        <Text size="sm" c="dimmed">{event.location}</Text>
                    </Group>


                    {getEventDate()}


                </Flex>
            </Group>
            <TextEditorContent content={event.description} />

        </Paper>
    )
}