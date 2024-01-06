
import { NavbarLinksGroup } from "@/components/NavbarLinksGroup";
import UserButton from "@/components/UserButton";
import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  ScrollArea,
  Stack,
  rem,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const theme = useMantineTheme();
  const isSmall = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [opened, { toggle, close }] = useDisclosure();
  const { setColorScheme } = useMantineColorScheme();
  const location = useLocation();

  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: false,
  });



  const isDarkTheme = computedColorScheme === "dark";

  useEffect(() => {
    if (isSmall) {
      close();
    }
  }, [location, isSmall]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 280, breakpoint: "sm", collapsed: { mobile: !opened } }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            {/* <Image maw={isSmall ? 40 : 200} src={isSmall ? logoIcon : isDarkTheme ? logoDark : logo} /> */}
          </Group>

          <Group>
            <UserButton />
            <ActionIcon
              onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
              variant="light"
              size="md"
              aria-label="Toggle color scheme"
              color={isDarkTheme ? "orange" : "gray"}
            >
              {isDarkTheme ? (
                <IconSun style={{ width: rem(16), height: rem(16) }} color="yellow" />
              ) : (
                <IconMoon style={{ width: rem(16), height: rem(16) }} color="black" />
              )}
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Stack gap={0} justify="space-between" style={{ height: "100%" }}>
          <ScrollArea>
            <NavbarLinksGroup />
          </ScrollArea>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}