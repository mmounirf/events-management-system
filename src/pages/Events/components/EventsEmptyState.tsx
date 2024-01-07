import { Button, Code, Flex, Paper, Text, Title } from "@mantine/core";
import { DatesRangeValue } from "@mantine/dates";
import { IconArrowRight } from "@tabler/icons-react";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";

type EmptyStateProps = {
    loading: boolean;
    count: number;
    dateRange: DatesRangeValue;
    dateQuery: string;
    searchQuery: string;
};

export default function EventsEmptyState({ loading, count, dateRange, dateQuery, searchQuery }: EmptyStateProps) {
    if (loading) {
        return null;
    }
    const selectedDateRange = dateRange.filter((date) => date !== null);

    const hasNoQueries = selectedDateRange.length === 0 && searchQuery === "" && dateQuery === "all";
    const hasSearchQuery = searchQuery !== "";
    const hasDateQuery = dateQuery !== "all";
    const hasDateRange = selectedDateRange.length > 0;

    const getHeadline = () => {
        if (hasNoQueries) {
            return "No events yet?";
        }

        if (hasSearchQuery || hasDateQuery || hasDateRange) {
            return "No events found!";
            // return `No event name or description matches ${<Code>{searchQuery}</Code>}`
        }
    };

    const getSubHeadline = () => {
        if (hasNoQueries) {
            return <>Unleash your creativity and create events that inspire.</>;
        }

        if (hasSearchQuery) {
            return (
                <>
                    No event name matches <Code>{searchQuery}</Code>
                </>
            );
        }

        if (hasDateQuery) {
            return (
                <>
                    You don't have <Code>{dateQuery}</Code> events
                </>
            );
        }

        if (hasDateRange) {
            return (
                <>
                    You don't have events within <Code>{dayjs(dateRange[0]).format("DD.MM.YYYY")}</Code> -{" "}
                    <Code>{dayjs(dateRange[1]).format("DD.MM.YYYY")}</Code>
                </>
            );
        }
    };

    const getAction = () => {
        if (hasNoQueries) {
            return (
                <Button component={NavLink} to="./new" mt="lg" variant="fill" rightSection={<IconArrowRight />}>
                    Get started
                </Button>
            );
        }
    };

    if (count === 0) {
        return (
            <Flex align="center" justify="center" w="100%" h="calc(100vh - 150px)">
                <Paper shadow="xl" p="xl" w="100%" maw={600}>
                    <Flex direction="column" align="center" justify="center">
                        <Title ta="center">{getHeadline()}</Title>
                        <Text ta="center">{getSubHeadline()}</Text>
                        {getAction()}
                    </Flex>
                </Paper>
            </Flex>
        );
    }
}
