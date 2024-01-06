import { ColorSchemeScript, MantineProvider, localStorageColorSchemeManager } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/notifications/styles.css";
import { Router } from "./Router";
import { AuthProvider } from "./context/AuthContext";
import { theme } from "./theme";

import "@mantine/core/styles.layer.css";
import "./styles.css";


const colorSchemeManager = localStorageColorSchemeManager({ key: "eventor-theme" });

export default function App() {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="dark" />
      <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager} defaultColorScheme="auto">
        <ModalsProvider>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
