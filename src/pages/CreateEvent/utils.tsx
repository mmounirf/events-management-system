import { Tables } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import { showError } from "@/utils/errorNotification";
import { updateNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { FormValues } from "./CreateEventFormProvider";

export async function createEvent({
  values,
  notification,
}: {
  values: FormValues;
  notification: string;
}): Promise<Tables<"events"> | undefined> {
  // Create event and return it
  const { data, error } = await supabase
    .from("events")
    .insert({ ...values })
    .select();

  // Error creating event
  if (error) {
    updateNotification({
      id: notification,
      title: "Failed to create event",
      message: error.message,
      color: "red",
      icon: <IconX />,
      loading: false,
      autoClose: true,
    });
    return;
  }

  return data[0];
}

export async function uploadFiles({
  coverFile,
  iconFile,
  notification,
  eventId,
}: {
  coverFile?: File;
  iconFile?: File;
  notification: string;
  eventId: string;
}) {
  // Upload cover file
  if (coverFile) {
    updateNotification({
      id: notification,
      message: "Uploading cover image",
    });
    const extension = coverFile?.name.split(".").pop() ?? "png";
    const { data: coverFileData, error: coverFileUploadError } = await supabase.storage
      .from("events-assets")
      .upload(`/${eventId}/cover.${extension}`, coverFile);

    // Cover file upload error
    if (coverFileUploadError) {
      showError({
        title: "Failed to upload cover image",
        message: coverFileUploadError.message,
        color: "red",
      });
    }

    // Cover file uploaded, let's update the created event with cover file path
    if (coverFileData) {
      updateNotification({
        id: notification,
        message: "Cover image uploaded",
      });
      await supabase
        .from("events")
        .update({
          cover: `https://${import.meta.env.VITE_PROJECT_ID}.supabase.co/storage/v1/object/public/events-assets/${coverFileData.path}`,
        })
        .eq("id", eventId);
    }
  }

  // Upload icon file
  if (iconFile) {
    updateNotification({
      id: notification,
      message: "Uploading icon image",
    });
    const extension = iconFile?.name.split(".").pop() ?? "png";
    const { data: iconFileData, error: iconFileUploadError } = await supabase.storage
      .from("events-assets")
      .upload(`/${eventId}/icon.${extension}`, iconFile);

    // Error uploading icon file
    if (iconFileUploadError) {
      showError({
        title: "Failed to upload icon image",
        message: iconFileUploadError.message,
        color: "red",
      });
    }

    // Icon file uploaded, let's update the created event with icon file path
    if (iconFileData) {
      updateNotification({
        id: notification,
        message: "Icon image uploaded",
      });
      await supabase
        .from("events")
        .update({
          logo: `https://${import.meta.env.VITE_PROJECT_ID}.supabase.co/storage/v1/object/public/events-assets/${iconFileData.path}`,
        })
        .eq("id", eventId);
    }
  }
}
