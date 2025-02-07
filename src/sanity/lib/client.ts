/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from 'next-sanity'
import imageUrlBuilder from "@sanity/image-url";
//import { apiVersion, dataset, projectId, token } from '../env'


export const sanityClient = createClient({
  projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion:'2025-01-22',
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token:process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}