import TextEditor from "@/components/TextEditor";
import useTextEditor from "@/components/TextEditor/useTextEditor";
import { isSameDay } from "@/utils/datetimeHelpers";
import { Anchor, Button, Container, Flex, Group, Paper, Stack, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { isNotEmpty } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateEventFormProvider, useCreateEventForm } from "./CreateEventFormProvider";
import CoverImageInput from "./components/CoverImageInput/CoverImageInput";
import IconImageInput from "./components/IconImageInput/IconImageInput";
import InlineTextInput from "./components/InlineTextInput/InlineTextInput";
import { createEvent, uploadFiles } from "./utils";

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

	const onSubmit = async () => {
		const { hasErrors } = form.validate();

		if (hasErrors) {
			return;
		}

		setLoading(true);
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

		const event = await createEvent({ notification: createEventProgress, values: form.values });

		if (!event) {
			setLoading(false);
			return;
		}

		// Event created, now let's upload files
		// Upload files, report errors and update event details once file is uploaded
		await uploadFiles({ coverFile, iconFile, eventId: event.id, notification: createEventProgress });

		setLoading(false);
		navigate("/events");
		updateNotification({
			id: createEventProgress,
			title: "Event created successfully",
			message: (
				<Anchor size="xs" component={Link} to={`/events/${event.id}`} underline="always">
					Check your event here
				</Anchor>
			),
			icon: <IconCheck />,
			color: "green",
			loading: false,
			autoClose: true,
		});
	};

	return (
		<Container fluid p={0}>
			<CreateEventFormProvider form={form}>
				<form onSubmit={form.onSubmit(() => onSubmit())}>
					<CoverImageInput onChange={setCoverFile} />
					<Container fluid>
						<Flex gap="md" align="center" wrap="nowrap">
							<IconImageInput onChange={setIconFile} />
							<Flex align="center" w="100%" justify="space-between" gap="md">
								<InlineTextInput />
								<Button
									maw={180}
									h={50}
									type="submit"
									fullWidth
									rightSection={<IconArrowRight width={18} height={18} />}
									disabled={loading}
								>
									Create event
								</Button>
							</Flex>
						</Flex>
					</Container>
					<Container fluid mt="md">
						<Paper component={Stack} p="md" withBorder>
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
						</Paper>
					</Container>
				</form>
			</CreateEventFormProvider>
		</Container>
	);
}
