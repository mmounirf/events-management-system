import TextEditor, { useTextEditor } from "@/components/TextEditor";
import { supabase } from "@/lib/supabase";
import { Button, Center, Container, Loader, Paper, SegmentedControl, Stack, Text, TextInput, Textarea, Title, rem } from "@mantine/core";
import { DateTimePicker, DateValue } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { isNotEmpty, useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconArrowRight, IconCheck, IconEye, IconEyeClosed, IconX } from "@tabler/icons-react";
import { useState } from "react";

type EventFormType = {
  name: string;
  location: string;
  date: DateValue;
  is_public: boolean;
  short_description: string;
  long_description: string;
}

export default function CreateEventPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm<EventFormType>({
    initialValues: {
      name: "",
      location: "",
      date: null,
      is_public: false,
      short_description: "",
      long_description: ""
    },

    validate: {
      name: isNotEmpty('Event name is required'),
      location: isNotEmpty('Event location is required'),
      date: isNotEmpty('Event date is required'),
    },
  });

  const editor = useTextEditor({ onUpdate: ({ editor }) => form.setFieldValue('long_description', editor.getHTML()) });


  const createEvent = async () => {
    setLoading(true);

    const createStatus = showNotification({ message: 'Creating event...', color: 'blue', loading: true, autoClose: false, draggable: true, withCloseButton: true, withBorder: true })

    const { error } = await supabase.from('events').insert({ ...form.values });

    console.log(error)

    if (error) {
      updateNotification({ id: createStatus, message: error.message, color: 'red', icon: <IconX />, loading: false, autoClose: true })
    } else {
      updateNotification({ id: createStatus, message: 'Event added successfully', color: 'green', icon: <IconCheck />, loading: false, autoClose: true })
    }
    setLoading(false);

  }


  return (
    <Container fluid>
      <Title order={2} fw={500} mb="lg">
        Create new event
      </Title>
      <Paper p="xl" withBorder radius="lg">
        <form onSubmit={form.onSubmit(() => createEvent())}>
          <Stack>
            <TextInput
              required
              label="Event name"
              placeholder="Event name"
              {...form.getInputProps('name')}
            />
            <TextInput
              required
              label="Event location"
              placeholder="Event location"
              {...form.getInputProps('location')}
            />

            <DateTimePicker
              required
              label="Start date"
              placeholder="Start date"
              valueFormat="ddd. DD MMM. YYYY - hh:mmA"
              clearable
              {...form.getInputProps('date')}
            />

            <SegmentedControl
              value={`${form.values.is_public}`}
              onChange={(value) => form.setFieldValue('is_public', value === 'true')}
              data={[
                {
                  value: 'true',
                  label: (
                    <Center style={{ gap: 10 }}>
                      <IconEye style={{ width: rem(16), height: rem(16) }} />
                      <span>Public event</span>
                    </Center>
                  ),
                },
                {
                  value: 'false',
                  label: (
                    <Center style={{ gap: 10 }}>
                      <IconEyeClosed style={{ width: rem(16), height: rem(16) }} />
                      <span>Private event</span>
                    </Center>
                  ),
                },
              ]}
            />


            <Textarea label="Short description" placeholder="Event short description" {...form.getInputProps('short_description')} />

            <TextEditor label="Long description" editor={editor} />

            <Button type="submit" fullWidth rightSection={loading ? <Loader size="xs" color="white" /> : <IconArrowRight width={18} height={18} />} >
              <Text fw={500}>Create new event</Text>
            </Button>
          </Stack>


        </form>

      </Paper>
    </Container>
  );
}