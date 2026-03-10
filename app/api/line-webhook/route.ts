export async function POST(req: Request) {
  const body = await req.json()

  console.log("LINE webhook:", body)

  return new Response("OK")
}