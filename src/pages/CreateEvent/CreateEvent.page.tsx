import TextEditor, { useTextEditor } from "@/components/TextEditor";
import {
  Button,
  Center,
  Container,
  Flex,
  Loader,
  Paper,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Textarea,
  rem
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { isNotEmpty } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconArrowRight, IconEye, IconEyeClosed } from "@tabler/icons-react";
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
      recurrence_rule: null,
      recurrence_exception: null,
      is_all_day: false,
      description: "",
    },

    validate: {
      title: isNotEmpty("Event name is required"),
      start: isNotEmpty("Event start date is required"),
      end: isNotEmpty("Event end date is required"),
    },
  });

  const editor = useTextEditor({ onUpdate: ({ editor }) => form.setFieldValue("long_description", editor.getHTML()) });

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


  console.log(form.errors)

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

                <SegmentedControl
                  value={`${form.values.is_public}`}
                  onChange={(value) => form.setFieldValue("is_public", value === "true")}
                  data={[
                    {
                      value: "true",
                      label: (
                        <Center style={{ gap: 10 }}>
                          <IconEye style={{ width: rem(16), height: rem(16) }} />
                          <span>Public event</span>
                        </Center>
                      ),
                    },
                    {
                      value: "false",
                      label: (
                        <Center style={{ gap: 10 }}>
                          <IconEyeClosed style={{ width: rem(16), height: rem(16) }} />
                          <span>Private event</span>
                        </Center>
                      ),
                    },
                  ]}
                />

                <Textarea
                  label="Short description"
                  placeholder="Event short description"
                  {...form.getInputProps('description')}
                />

                <TextEditor label="Long description" editor={editor} />

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
