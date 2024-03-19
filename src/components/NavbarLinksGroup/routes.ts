import { IconCalendarEvent, IconHome } from "@tabler/icons-react";

export const routes = [
	{ label: "Dashboard", to: "/", icon: IconHome },
	{
		label: "Manage Events",
		icon: IconCalendarEvent,
		to: "/events",
		links: [
			{ label: "All events", to: "/events" },
			{ label: "Create new", to: "/events/new" },
		],
	},
];
