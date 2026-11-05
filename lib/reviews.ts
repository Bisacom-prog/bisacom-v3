import {client} from "@/sanity/lib/client";

export type Review = {_id: string; name: string; company?: string; role?: string; rating: number; review: string};

// Only reviews approved in Sanity Studio are public. An empty result renders no section.
export async function getApprovedReviews(): Promise<Review[]> {
  try {
    return await client.fetch<Review[]>(
      `*[_type == "review" && approved == true] | order(_createdAt desc)[0...12]{_id,name,company,role,rating,review}`,
      {},
      {next: {revalidate: 300}},
    );
  } catch {
    return [];
  }
}
