import TextEditor from "@/components/TextEditor";
import useTextEditor from "@/components/TextEditor/useTextEditor";
import { supabase } from "@/lib/supabase";
import { isSameDay } from "@/utils/datetimeHelpers";
import { showError } from "@/utils/errorNotification";
import { Anchor, Button, Container, Flex, Group, Paper, Stack, Text, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { isNotEmpty } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconArrowRight, IconCheck, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateEventFormProvider, useCreateEventForm } from "./CreateEventFormProvider";
import CoverImageInput from "./components/CoverImageInput/CoverImageInput";
import IconImageInput from "./components/IconImageInput/IconImageInput";
import InlineTextInput from "./components/InlineTextInput/InlineTextInput";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [coverFile, setCoverFile] = useState<File>();
  const [iconFile, setIconFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const form = useCreateEventForm({
    initialValues: {
      cover: null,
      logo: null,
      title: "",
      location: "",
      start: "",
      end: "",
      description: "",
      recurrence_rule: null,
      recurrence_exception: null,
    },
    validate: {
      title: isNotEmpty("Event name is required"),
      start: isNotEmpty("Event start date is required"),
      end: isNotEmpty("Event end date is required"),
    },
  });

  const editor = useTextEditor({ onUpdate: ({ editor }) => form.setFieldValue("description", editor.getHTML()) });

  const createEvent = async () => {
    setLoading(true);
    const { hasErrors } = form.validate();

    if (hasErrors) {
      setLoading(false);
      return;
    }

    const createEventProgress = showNotification({
      title: "Creating event...",
      message: "It may take awhile depending on your guest list.",
      color: "blue",
      loading: true,
      autoClose: false,
      draggable: true,
      withCloseButton: true,
      withBorder: true,
    });

    // Create event and return it
    const { data, error } = await supabase.from("events").insert({ ...form.values }).select();

    // Error creating event
    if (error) {
      updateNotification({
        id: createEventProgress,
        title: 'Failed to create event',
        message: error.message,
        color: "red",
        icon: <IconX />,
        loading: false,
        autoClose: true,
      });
      setLoading(false);
      return;
    }

    // Event created, now let's upload files
    if (data) {
      const event = data[0];

      // Upload cover file
      if (coverFile) {
        updateNotification({
          id: createEventProgress,
          message: 'Uploading cover image'
        });
        const extension = coverFile?.name.split('.').pop() ?? 'png';
        const { data: coverFileData, error: coverFileUploadError } = await supabase.storage.from('events').upload(`/${event.id}/cover.${extension}`, coverFile);

        // Cover file upload error
        if (coverFileUploadError) {
          showError({
            title: 'Failed to upload cover image',
            message: coverFileUploadError.message,
            color: "red",
          });
        }

        // Cover file uploaded, let's update the created event with cover file path
        if (coverFileData) {
          updateNotification({
            id: createEventProgress,
            message: 'Cover image uploaded'
          });
          await supabase.from("events").update({ cover: coverFileData.path }).eq('id', event.id)
        }
      }


      // Upload icon file
      if (iconFile) {
        updateNotification({
          id: createEventProgress,
          message: 'Uploading icon image'
        });
        const extension = iconFile?.name.split('.').pop() ?? 'png';
        const { data: iconFileData, error: iconFileUploadError } = await supabase.storage.from('events').upload(`/${event.id}/icon.${extension}`, iconFile);

        // Error uploading icon file
        if (iconFileUploadError) {
          showError({
            title: 'Failed to upload icon image',
            message: iconFileUploadError.message,
            color: "red",
          });
        }

        // Icon file uploaded, let's update the created event with icon file path
        if (iconFileData) {
          updateNotification({
            id: createEventProgress,
            message: 'Icon image uploaded'
          });
          await supabase.from("events").update({ logo: iconFileData.path }).eq('id', event.id)
        }
      }

      setLoading(false);
      navigate('/events');
      updateNotification({
        id: createEventProgress,
        title: 'Event created successfully',
        message: <Anchor size="sm" component={Link} to={`/events/${event.id}`} underline="always">Check your event here</Anchor>,
        icon: <IconCheck />,
        color: 'green',
        loading: false,
        autoClose: true,
      });
    }

  };

  return (
    <Container fluid p={0}>
      <CreateEventFormProvider form={form}>
        <form onSubmit={form.onSubmit(() => createEvent())}>
          <CoverImageInput onChange={setCoverFile} />
          <Container fluid>
            <Flex gap="md" align="center" wrap="nowrap">
              <IconImageInput onChange={setIconFile} />
              <InlineTextInput />
            </Flex>
          </Container>
          <Container fluid>
            <Paper p="xl" my="md" withBorder>
              <Stack>
                <TextInput label="Event location" placeholder="Event location" {...form.getInputProps("location")} />
                <Group grow align="flex-start">
                  <DateTimePicker
                    label="Start date"
                    placeholder="Start date"
                    valueFormat="ddd. DD MMM. YYYY - hh:mmA"
                    clearable
                    minDate={dayjs().toDate()}
                    getDayProps={(date) => (isSameDay(date) ? { style: { fontWeight: "bolder" } } : {})}
                    {...form.getInputProps("start")}
                  />
                  <DateTimePicker
                    label="End date"
                    placeholder="End date"
                    valueFormat="ddd. DD MMM. YYYY - hh:mmA"
                    clearable
                    minDate={dayjs(form.values.start).toDate()}
                    getDayProps={(date) => (isSameDay(date) ? { style: { fontWeight: "bolder" } } : {})}
                    {...form.getInputProps("end")}
                  />
                </Group>
                <TextEditor label="Description" editor={editor} />
              </Stack>
            </Paper>
            <Button
              type="submit"
              fullWidth
              rightSection={<IconArrowRight width={18} height={18} />}
              disabled={loading}
            >
              <Text fw={500}>Create new event</Text>
            </Button>
          </Container>
        </form>
      </CreateEventFormProvider>
    </Container >
  );
}
