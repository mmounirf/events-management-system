import { ActionIcon, Box, Group, Input, Stack, TextInput, Title } from "@mantine/core";
import { getHotkeyHandler, useClickOutside, useDisclosure } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useCreateEventFormContext } from "../../CreateEventFormProvider";
import classes from "./InlineTextInput.module.css";

export default function InlineTextInput() {
    const { values, setFieldValue, errors } = useCreateEventFormContext();
    const [editMode, handlers] = useDisclosure(false);
    const [textInputRef, setTextInputRef] = useState<HTMLElement | null>(null);
    const [actionButtonsRef, setActionButtonsRef] = useState<HTMLElement | null>(null);
    const [intermediateValue, setIntermediateValue] = useState("");

    const hasError = errors.title !== undefined;

    useClickOutside(
        () => {
            if (intermediateValue !== "") {
                setFieldValue("title", intermediateValue);
            }
            handlers.close();
        },
        ["mouseup", "touchend"],
        [textInputRef, actionButtonsRef]
    );

    const onInputSubmit = () => {
        if (intermediateValue !== "") {
            setFieldValue("title", intermediateValue);
        }
        handlers.close();
    };

    const onInputCancel = () => {
        setIntermediateValue(values.title);
        handlers.close();
    };

    if (editMode) {
        return (
            <Stack gap={0} w="100%" pos="relative">
                <TextInput
                    wrapperProps={{ "aria-invalid": hasError }}
                    onKeyDown={getHotkeyHandler([["Enter", onInputSubmit]])}
                    defaultValue={values.title}
                    onChange={({ target }) => setIntermediateValue(target.value)}
                    className={classes.textInput}
                    width="100%"
                    autoFocus
                    px="xs"
                    rightSection={
                        <Group gap="xs" pl="xs" ref={setActionButtonsRef}>
                            <ActionIcon size="lg" radius="md" variant="light" onClick={() => onInputSubmit()}>
                                <IconCheck style={{ width: "70%", height: "70%" }} stroke={2} />
                            </ActionIcon>
                            <ActionIcon size="lg" radius="md" variant="light" onClick={() => onInputCancel()}>
                                <IconX style={{ width: "70%", height: "70%" }} stroke={2} />
                            </ActionIcon>
                        </Group>
                    }
                    rightSectionWidth={90}
                    ref={setTextInputRef}
                    variant="unstyled"
                    size="lg"
                    placeholder="New event"
                    styles={{
                        input: {
                            fontSize: "var(--mantine-h2-font-size)",
                            fontWeight: "var(--mantine-h2-font-weight)",
                            lineHeight: "var(--mantine-h2-line-height)",
                        },
                    }}
                />
                <Input.Error pos="absolute" bottom={-20} hidden={!hasError}>
                    {errors.title}
                </Input.Error>
            </Stack>
        );
    }

    return (
        <Stack gap={0} w="100%" pos="relative">
            <Box
                data-error={hasError}
                className={errors.title ? `${classes.container} ${classes.inputError}` : classes.container}
                onClick={() => handlers.toggle()}
            >
                <Title order={2} px="sm">
                    {values.title === "" ? "New event" : values.title}
                </Title>
            </Box>
            <Input.Error pos="absolute" bottom={-20} hidden={!hasError}>
                {errors.title}
            </Input.Error>
        </Stack>
    );
}
