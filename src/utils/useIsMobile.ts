import { em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function useIsMobile() {
  const isMobile = useMediaQuery(`(max-width: ${em(372)})`);
  return isMobile;
}
