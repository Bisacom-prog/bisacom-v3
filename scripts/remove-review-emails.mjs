// Removes the email field from existing review documents, which are publicly readable in Sanity.
// Saves a local backup first (ignored by git). Run once:
//   node --env-file=.env.local scripts/remove-review-emails.mjs
// Needs SANITY_API_WRITE_TOKEN in .env.local.
import {writeFileSync} from "node:fs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local first.");
  process.exit(1);
}

const api = `https://${projectId}.api.sanity.io/v2025-02-19/data`;
const headers = {Authorization: `Bearer ${token}`, "Content-Type": "application/json"};
const query = encodeURIComponent('*[_type == "review" && defined(email)]{_id,name,email}');
const found = await (await fetch(`${api}/query/${dataset}?query=${query}`, {headers})).json();
const reviews = found.result ?? [];
if (!reviews.length) {
  console.log("No review emails to remove.");
  process.exit(0);
}

writeFileSync(".review-emails-backup.json", JSON.stringify(reviews, null, 2));
console.log(`Backed up ${reviews.length} email(s) to .review-emails-backup.json`);

const mutations = reviews.map((review) => ({patch: {id: review._id, unset: ["email"]}}));
const response = await fetch(`${api}/mutate/${dataset}`, {method: "POST", headers, body: JSON.stringify({mutations})});
if (!response.ok) {
  console.error(`Sanity refused the update (${response.status}). Check the token has write access.`);
  process.exit(1);
}
console.log(`Removed the email field from ${reviews.length} review(s).`);
