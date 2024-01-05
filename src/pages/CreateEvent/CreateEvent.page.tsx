import TextEditor from "@/components/TextEditor";
import useTextEditor from "@/components/TextEditor/useTextEditor";
import {
  Button,
  Container,
  Flex,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  TextInput
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { isNotEmpty } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";
import { CreateEventFormProvider, useCreateEventForm } from "./CreateEventFormProvider";
import CoverImageInput from "./components/CoverImageInput/CoverImageInput";
import IconImageInput from "./components/IconImageInput/IconImageInput";
import InlineTextInput from "./components/InlineTextInput/InlineTextInput";


export default function CreateEventPage() {
  const [loading, setLoading] = useState(false);
  const form = useCreateEventForm({
    initialValues: {
      cover: null,
      logo: null,
      title: "",
      location: "",
      start: "",
      end: "",
      is_all_day: false,
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
    form.validate()
    console.log('form valid', form.isValid())
    console.log(form.values)
    console.log(form.errors)

    const createEventProgress = showNotification({
      message: "Creating event...",
      color: "blue",
      loading: true,
      autoClose: false,
      draggable: true,
      withCloseButton: true,
      withBorder: true,
    });

    // const { error } = await supabase.from("events").insert({ ...form.values });

    // console.log(error);

    // if (error) {
    //   updateNotification({
    //     id: createEventProgress,
    //     message: error.message,
    //     color: "red",
    //     icon: <IconX />,
    //     loading: false,
    //     autoClose: true,
    //   });
    // } else {
    //   updateNotification({
    //     id: createEventProgress,
    //     message: "Event added successfully",
    //     color: "green",
    //     icon: <IconCheck />,
    //     loading: false,
    //     autoClose: true,
    //   });
    // }
    setLoading(false);
  };

  return (
    <Container fluid p={0}>
      <CreateEventFormProvider form={form}>
        <form onSubmit={form.onSubmit(() => createEvent())}>
          <CoverImageInput onChange={console.log} />

          <Container fluid>
            <Flex gap="md" align="center" wrap="nowrap">
              <IconImageInput onChange={console.log} />
              <InlineTextInput />
            </Flex>
          </Container>

          <Container fluid mt="md">
            <Paper p="xl" withBorder>

              <Stack>
                <TextInput
                  label="Event location"
                  placeholder="Event location"
                  {...form.getInputProps("location")}
                />
                <Group grow align="center">
                  <DateTimePicker

                    label="Start date"
                    placeholder="Start date"
                    valueFormat="ddd. DD MMM. YYYY - hh:mmA"
                    clearable
                    {...form.getInputProps("start")}
                  />

                  <DateTimePicker
                    label="End date"
                    placeholder="End date"
                    valueFormat="ddd. DD MMM. YYYY - hh:mmA"
                    clearable
                    {...form.getInputProps("end")}
                  />
                </Group>


                <TextEditor label="Description" editor={editor} />

                <Button
                  type="submit"
                  fullWidth
                  rightSection={loading ? <Loader size="xs" color="white" /> : <IconArrowRight width={18} height={18} />}
                >
                  <Text fw={500}>Create new event</Text>
                </Button>
              </Stack>

            </Paper>
          </Container>
        </form>
      </CreateEventFormProvider>
    </Container>
  );
}
