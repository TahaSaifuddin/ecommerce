/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from 'next-sanity'
import imageUrlBuilder from "@sanity/image-url";
//import { apiVersion, dataset, projectId, token } from '../env'


export const sanityClient = createClient({
  projectId:'efklgk0j',
  dataset:'production',
  apiVersion:'2025-01-22',
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token:'sk7Rt2CmKlo8OTWvzJR6d0T1pdiyrvG4TpjFnRHxLZitpk0lMQyp75qWE4Y2gz0I1KLMjr2MHWI8cDgfpAoUcHeS7Z3JWLEquZnwbV9XG0k7uO7DgA0AeNw3iHR0SLPofdE9iElhcLyAMQUDKeuMJbra4o4UmDppl6FQ9PdnCnFusVg9l9IE',
})

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}