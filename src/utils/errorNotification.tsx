import { type NotificationData, notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

export function showError(data: NotificationData) {
	notifications.show({
		...data,
		draggable: true,
		withCloseButton: true,
		color: "red",
		icon: <IconX />,
	});
}
