import type { Tables } from "@/lib/database.types";
import { defer } from "react-router-dom";

export type Response = {
  data: Tables<"events">[];
  count: number | null;
};

export function getAllEvents(): Response {
  return defer({ data, count });
}
