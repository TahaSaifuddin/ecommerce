import createImageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const urlFor = (source: SanityImageSource) => {
  const config = sanityClient.config();

  // Ensure projectId and dataset are valid strings
  if (!config.projectId || !config.dataset) {
    throw new Error("Sanity client is missing projectId or dataset.");
  }

  return createImageUrlBuilder({
    projectId: config.projectId as string,
    dataset: config.dataset as string,
  }).image(source);
};
