import { notFound } from "next/navigation";

type PageProps = {
  params: {
    requestId: string;
  };
};

function normalizeDomain(domain: string): string {
  if (domain.startsWith("http://") || domain.startsWith("https://")) {
    return domain;
  }
  return `https://${domain}`;
}

async function getImages(requestId: string): Promise<string[]> {
  const domain = process.env.KINTONE_DOMAIN;
  const app = process.env.KINTONE_APP_ID;
  const token = process.env.KINTONE_API_TOKEN;

  if (!domain || !app || !token) {
    return [];
  }

  const baseUrl = normalizeDomain(domain);
  const query = `request_id = "${requestId}" order by $id desc limit 1`;

  const res = await fetch(
    `${baseUrl}/k/v1/records.json?app=${encodeURIComponent(
      app
    )}&query=${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: {
        "X-Cybozu-API-Token": token,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  const record = data.records?.[0];

  if (!record) {
    return [];
  }

  const allImageUrls = record.all_image_urls?.value || "";

  return allImageUrls
    .split("\n")
    .map((url: string) => url.trim())
    .filter(Boolean);
}

export default async function SummaryPage({ params }: PageProps) {
  const images = await getImages(params.requestId);

  if (images.length === 0) {
    notFound();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff",
        padding: "24px 16px 40px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            margin: "0 0 8px",
            fontSize: 24,
            fontWeight: 800,
            lineHeight: 1.4,
          }}
        >
          お写真一覧
        </h1>

        <p
          style={{
            margin: "0 0 20px",
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
          }}
        >
          受付番号: {params.requestId}
        </p>

        <div
          style={{
            display: "grid",
            gap: 16,
          }}
        >
          {images.map((url, index) => (
            <a
              key={`${url}-${index}`}
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{ display: "block", textDecoration: "none" }}
            >
              <img
                src={url}
                alt={`添付画像 ${index + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 16,
                  border: "1px solid #eee",
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}