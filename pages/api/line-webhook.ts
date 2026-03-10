export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).send("LINE webhook alive");
    return;
  }

  if (req.method === "POST") {
    console.log("LINE webhook:", req.body);
    res.status(200).send("OK");
    return;
  }

  res.status(405).end();
}

