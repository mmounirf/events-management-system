import { ActionIcon, Box, Collapse, Group, ThemeIcon, rem } from "@mantine/core";
import { IconChevronRight, type TablerIconsProps } from "@tabler/icons-react";
import { type MouseEventHandler, useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import classes from "./NavbarLinksGroup.module.css";
import { routes } from "./routes";

interface LinksGroupProps {
	icon: React.FC<TablerIconsProps>;
	label: string;
	initiallyOpened?: boolean;
	to: string;
	links?: { label: string; to: string }[];
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, to }: LinksGroupProps) {
	const hasLinks = Array.isArray(links);
	const [opened, setOpened] = useState(initiallyOpened || false);
	const items = (hasLinks ? links : []).map((link) => (
		<RouterLink className={classes.link} to={link.to} key={link.label} end>
			{link.label}
		</RouterLink>
	));

	const toggleParent: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		setOpened((isOpened) => !isOpened);
	};

	return (
		<>
			<RouterLink to={to} className={classes.control} end>
				<Group justify="space-between" gap={0}>
					<Box style={{ display: "flex", alignItems: "center" }}>
						<ThemeIcon variant="light" size={30}>
							<Icon style={{ width: rem(18), height: rem(18) }} />
						</ThemeIcon>
						<Box ml="md">{label}</Box>
					</Box>
					{hasLinks && (
						<ActionIcon variant="subtle" aria-label="Settings" onClick={toggleParent}>
							<IconChevronRight
								className={classes.chevron}
								stroke={1.5}
								style={{
									width: rem(16),
									height: rem(16),
									transform: opened ? "rotate(90deg)" : "none",
								}}
							/>
						</ActionIcon>
					)}
				</Group>
			</RouterLink>
			{hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
		</>
	);
}

export function NavbarLinksGroup() {
	const links = routes.map((item) => <LinksGroup {...item} key={item.label} />);

	return <>{links}</>;
}
