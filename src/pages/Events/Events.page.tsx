import { useGetEvents } from "@/hooks/useGetEvents";
import { Stack, Title } from "@mantine/core";
import '@mantine/dates/styles.css';
import dayjs from "dayjs";
import { useState } from "react";
import EventItem from "./components/EventItem";


export default function EventsPage() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const dateRange = value.filter((range) => range).length === 2 ? `[${value.map((day) => dayjs(day).format('YYYY-MM-DD')).join(',')}]` : undefined
  console.log(dateRange)
  const { events, count, loading } = useGetEvents({ dateRange });

  console.log(events, count)



  return (
    <>
      <Title>Events Page</Title>
      <Stack>
        {events.map((event) => <EventItem event={event} />)}
      </Stack>


    </>
  );

}