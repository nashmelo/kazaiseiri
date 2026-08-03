import { notFound } from "next/navigation";
import { isValidRequestId } from "@/lib/requestId";

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

type SummaryResult = {
  /** 依頼そのものが見つかったか */
  found: boolean;
  images: string[];
};

async function getImages(requestId: string): Promise<SummaryResult> {
  // **外部から渡された値を、検証せずにクエリへ埋め込んではいけない。**
  // 引用符を含む値を渡されると kintone のクエリを改変され、
  // 他人のレコード（＝他人の部屋の写真）を引ける。
  if (!isValidRequestId(requestId)) {
    return { found: false, images: [] };
  }

  const domain = process.env.KINTONE_DOMAIN;
  const app = process.env.KINTONE_APP_ID;
  const token = process.env.KINTONE_API_TOKEN;

  if (!domain || !app || !token) {
    return { found: false, images: [] };
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
    return { found: false, images: [] };
  }

  const data = await res.json();
  const record = data.records?.[0];

  if (!record) {
    return { found: false, images: [] };
  }

  const allImageUrls = record.all_image_urls?.value || "";

  return {
    found: true,
    images: allImageUrls
      .split("\n")
      .map((url: string) => url.trim())
      .filter(Boolean),
  };
}

export default async function SummaryPage({ params }: PageProps) {
  const { found, images } = await getImages(params.requestId);

  // **依頼そのものが見つからないときだけ 404 にする。**
  // 依頼はあるが写真が無い、という状態で 404 を返すと、
  // 依頼者には「壊れている」ようにしか見えない。
  if (!found) {
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

        {images.length === 0 ? (
          <p
            style={{
              margin: 0,
              padding: "32px 16px",
              textAlign: "center",
              fontSize: 14,
              lineHeight: 1.9,
              color: "#666",
              background: "#f7f7f7",
              borderRadius: 12,
            }}
          >
            この受付番号には、お写真の登録がありません。
            <br />
            お心当たりのない場合は、お手数ですがご連絡ください。
          </p>
        ) : null}

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