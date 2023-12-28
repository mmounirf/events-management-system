
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Avatar, Button, Menu, Stack, Text, rem } from "@mantine/core";
import { IconLogout2, IconSettings } from "@tabler/icons-react";

export default function UserButton() {
    const { user } = useAuth();

    const logout = async () => {
        await supabase.auth.signOut()
    }



    const getInitials = () => {
        const initials = user?.user_metadata.name ? user.user_metadata.name.substring(0, 2) : user?.email?.substring(0, 2);
        return initials.toUpperCase();
    };


    return (
        <Menu shadow="md" width={200} withArrow offset={0}>
            <Menu.Target>
                <Button
                    size="md"
                    radius="sm"
                    variant="subtle"
                    leftSection={
                        <Avatar size="sm" color="brand" radius="xl">
                            {getInitials()}
                        </Avatar>
                    }
                >
                    <Stack align="flex-start" gap={0}>
                        <Text size="sm" fw={500}>
                            {user?.user_metadata.name}

                        </Text>

                        <Text c="dimmed" size="xs">
                            {user?.email}
                        </Text>
                    </Stack>
                </Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    component="a"
                    leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
                    href="/settings"
                >
                    Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                    color="red"
                    leftSection={<IconLogout2 style={{ width: rem(14), height: rem(14) }} />}
                    onClick={() => logout()}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}