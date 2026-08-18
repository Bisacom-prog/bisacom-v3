import {NextResponse} from "next/server";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const version = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";

export async function GET() {
  if (!projectId) return NextResponse.json([]);
  const query = encodeURIComponent('*[_type == "review" && approved == true] | order(_createdAt desc)[0...6]{_id,name,company,role,rating,review}');
  const response = await fetch(`https://${projectId}.api.sanity.io/v${version}/data/query/${dataset}?query=${query}`, {next: {revalidate: 300}});
  if (!response.ok) return NextResponse.json([]);
  const data = await response.json();
  return NextResponse.json(data.result || []);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (typeof body.website === "string" && body.website) return NextResponse.json({ok: true});
    const name = String(body.name || "").trim().slice(0, 120);
    const email = String(body.email || "").trim().slice(0, 200);
    const review = String(body.review || "").trim().slice(0, 800);
    const rating = Math.max(1, Math.min(5, Number(body.rating)));
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || review.length < 20 || !Number.isInteger(rating)) return NextResponse.json({error:"Invalid review."},{status:400});
    if (!projectId || !process.env.SANITY_API_WRITE_TOKEN) return NextResponse.json({error:"Review service is not configured."},{status:503});
    const mutation = {mutations:[{create:{_type:"review",name,email,company:String(body.company||"").trim().slice(0,120),role:String(body.role||"").trim().slice(0,120),rating,review,approved:false}}]};
    const response = await fetch(`https://${projectId}.api.sanity.io/v${version}/data/mutate/${dataset}`,{method:"POST",headers:{Authorization:`Bearer ${process.env.SANITY_API_WRITE_TOKEN}`,"Content-Type":"application/json"},body:JSON.stringify(mutation)});
    if (!response.ok) return NextResponse.json({error:"Review could not be saved."},{status:502});
    return NextResponse.json({ok:true});
  } catch { return NextResponse.json({error:"Invalid request."},{status:400}); }
}
