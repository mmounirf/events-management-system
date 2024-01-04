import { ChangeEventHandler, useRef, useState } from "react";

import { Badge, Image, Paper, Stack, ThemeIcon, Transition, UnstyledButton, rem } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import classes from "./IconImageInput.module.css";

type IconImageInputProps = {
    onChange: (file: File | undefined) => void;
    src?: string;
};

export default function IconImageInput({ onChange, src }: IconImageInputProps) {
    const iconImageInputRef = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(src ?? null);
    const [hovered, setHovered] = useState(false);

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const selectedFile = event.target.files?.[0];
        onChange(selectedFile);
        setImageUrl(selectedFile ? URL.createObjectURL(selectedFile) : null);
        setHovered(false);
    };

    if (imageUrl === null) {
        return (
            <Paper shadow="md" withBorder p="xs" className={classes.container}>
                <input type="file" ref={iconImageInputRef} accept="image/png,image/jpeg" hidden onChange={onInputChange} />
                <UnstyledButton
                    className={classes.iconImageButton}
                    onClick={() => iconImageInputRef.current?.click()}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <Stack align="center" gap="xs">
                        <ThemeIcon variant="transparent" size="50">
                            <IconPhoto style={{ width: rem(50), height: rem(50), zIndex: 10 }} />
                        </ThemeIcon>
                        <Badge size="xs">Upload event icon</Badge>
                    </Stack>
                </UnstyledButton>
            </Paper>
        );
    }

    return (
        <Paper shadow="md" withBorder p="xs" className={classes.container}>
            <input type="file" ref={iconImageInputRef} accept="image/png,image/jpeg" hidden onChange={onInputChange} />

            <UnstyledButton
                pos="relative"
                className={classes.iconImageButton}
                onClick={() => iconImageInputRef.current?.click()}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Image src={imageUrl} radius="md" fit="contain" className={classes.imageBg} bg="white" />

                <Transition mounted={hovered} transition="pop" duration={400} timingFunction="ease" keepMounted>
                    {(styles) => (
                        <Stack gap="xs" align="center" style={{ ...styles, zIndex: 10 }} className={classes.animatedHover}>
                            <ThemeIcon variant="transparent" size="50">
                                <IconPhoto style={{ width: rem(50), height: rem(50) }} />
                            </ThemeIcon>
                            <Badge size="xs">Upload event icon</Badge>
                        </Stack>
                    )}
                </Transition>
            </UnstyledButton>
        </Paper>
    );
}
