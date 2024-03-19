import { type ChangeEventHandler, useRef, useState } from "react";

import { showError } from "@/utils/errorNotification";
import { Badge, Image, Stack, ThemeIcon, Transition, UnstyledButton, rem } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import classes from "./CoverImageInput.module.css";

type CoverImageInputProps = {
	onChange: (file: File | undefined) => void;
	src?: string;
};

export default function CoverImageInput({ onChange, src }: CoverImageInputProps) {
	const coverImageInputRef = useRef<HTMLInputElement>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(src ?? null);
	const [hovered, setHovered] = useState(false);

	const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		const selectedFile = event.target.files?.[0];

		if (!selectedFile) {
			return;
		}

		// Events bucket limit for each object is 2MB
		if (selectedFile && selectedFile?.size > 2097152) {
			showError({
				title: "The selected image cannot be uploaded.",
				message: "The maximum image size is 2MB",
			});
			event.target.value = "";
			return;
		}
		onChange(selectedFile);
		setImageUrl(selectedFile ? URL.createObjectURL(selectedFile) : null);
		setHovered(false);
	};

	if (imageUrl === null) {
		return (
			<>
				<input type="file" ref={coverImageInputRef} accept="image/png,image/jpeg" hidden onChange={onInputChange} />
				<UnstyledButton
					onClick={() => coverImageInputRef.current?.click()}
					className={classes.container}
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
				>
					<Stack align="center" gap="xs">
						<ThemeIcon variant="transparent" size="50">
							<IconPhoto style={{ width: rem(50), height: rem(50), zIndex: 10 }} />
						</ThemeIcon>
						<Badge>Upload event cover</Badge>
					</Stack>
				</UnstyledButton>
			</>
		);
	}

	return (
		<>
			<input type="file" ref={coverImageInputRef} accept="image/png,image/jpeg" hidden onChange={onInputChange} />

			<UnstyledButton
				pos="relative"
				onClick={() => coverImageInputRef.current?.click()}
				className={classes.container}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				<Image src={imageUrl} h={200} fit="cover" className={classes.imageBg} />

				<Transition mounted={hovered} transition="pop" duration={400} timingFunction="ease" keepMounted>
					{(styles) => (
						<Stack gap="xs" align="center" style={{ ...styles, zIndex: 10 }} className={classes.animatedHover}>
							<ThemeIcon variant="transparent" size="50">
								<IconPhoto style={{ width: rem(50), height: rem(50) }} />
							</ThemeIcon>
							<Badge>Upload event cover</Badge>
						</Stack>
					)}
				</Transition>
			</UnstyledButton>
		</>
	);
}
