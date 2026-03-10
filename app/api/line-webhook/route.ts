export const runtime = "nodejs";

export async function GET() {
  return new Response("LINE webhook alive");
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log("LINE webhook:", body);
  return new Response("OK");
export const runtime = "nodejs";

export async function GET() {
  return new Response("LINE webhook alive");
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log("LINE webhook:", body);
  return new Response("OK");
}

