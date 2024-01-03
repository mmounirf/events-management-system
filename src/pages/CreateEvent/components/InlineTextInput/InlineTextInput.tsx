import { ActionIcon, Box, Group, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import classes from "./InlineTextInput.module.css";

type InlineTextInput = {
    value: string;
    onChange: (value: string) => void;
};

export default function InlineTextInput({ value, onChange }: InlineTextInput) {
    const [editMode, handlers] = useDisclosure(false);
    const [textInputRef, setTextInputRef] = useState<HTMLElement | null>(null);
    const [actionButtonsRef, setActionButtonsRef] = useState<HTMLElement | null>(null);

    const form = useForm({ initialValues: { inputValue: value } });


    const onFormSubmit = () => {
        if (form.values.inputValue === '') {
            form.reset();
        }
        handlers.close();
        onChange(form.values.inputValue)
    };

    useClickOutside(
        () => {
            if (form.values.inputValue === "") {
                form.reset();
            }
            onChange(form.values.inputValue)
            handlers.close();
        },
        ["mouseup", "touchend"],
        [textInputRef, actionButtonsRef]
    );



    if (editMode) {
        return (
            <form onSubmit={form.onSubmit(() => onFormSubmit())} className={classes.form}>
                <TextInput
                    autoFocus
                    value={form.values.inputValue}
                    onChange={({ target }) => form.setFieldValue("inputValue", target.value)}
                    className={classes.textInput}
                    px="xs"
                    rightSection={
                        <Group gap="xs" pl="xs" ref={setActionButtonsRef}>
                            <ActionIcon type="submit" size="lg" radius="md" variant="light">
                                <IconCheck style={{ width: "70%", height: "70%" }} stroke={2} />
                            </ActionIcon>
                        </Group>
                    }
                    ref={setTextInputRef}
                    variant="unstyled"
                    size="xl"
                    placeholder={value}
                    styles={{
                        input: {
                            fontSize: "var(--mantine-h2-font-size)",
                            fontWeight: "var(--mantine-h2-font-weight)",
                            lineHeight: "var(--mantine-h2-line-height)",
                        },
                    }}
                />
            </form>
        );
    }

    return (
        <Box className={classes.container} onClick={() => handlers.toggle()}>
            <Title order={2}>
                {form.values.inputValue}
            </Title>
        </Box>
    );
}
