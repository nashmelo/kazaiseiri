import { notFound } from "next/navigation";
import { isUnguessableRequestId } from "@/lib/requestId";
import { supabaseAdmin } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{
    requestId: string;
  }>;
};

type SummaryResult = {
  /** 依頼そのものが見つかったか */
  found: boolean;
  images: string[];
};

async function getImages(requestId: string): Promise<SummaryResult> {
  // 依頼IDの形を必ず確かめる（保管先のフォルダ名に使うため）。
  // 推測できる旧形式（時刻だけ）の依頼は開かない（2026-11-09 技術点検）
  if (!isUnguessableRequestId(requestId)) {
    return { found: false, images: [] };
  }

  // 2026-11-02 から受付は kintone の商談管理に入るので、写真は保管先（Supabase）から直接読む。
  // 保存先は「年/月/依頼ID/」。年月は送信した端末の時計で決まるので、日本時間・世界標準時の両方と前後の月を見る
  const ms = Number(requestId.split("-")[1]);
  if (!ms) return { found: false, images: [] };
  const folders = new Set<string>();
  for (const offset of [9 * 3600e3, 0]) {
    for (const shift of [-1, 0, 1]) {
      const d = new Date(ms + offset);
      d.setUTCDate(1);
      d.setUTCMonth(d.getUTCMonth() + shift);
      folders.add(`${d.getUTCFullYear()}/${String(d.getUTCMonth() + 1).padStart(2, "0")}/${requestId}`);
    }
  }

  const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || process.env.SUPABASE_BUCKET || "estimate-images";
  const images: string[] = [];
  for (const folder of folders) {
    const { data, error } = await supabaseAdmin.storage.from(bucket).list(folder, { limit: 100 });
    if (error || !data?.length) continue;
    for (const f of data) {
      if (!f.name || f.name.startsWith(".")) continue;
      images.push(supabaseAdmin.storage.from(bucket).getPublicUrl(`${folder}/${f.name}`).data.publicUrl);
    }
    if (images.length) break;
  }

  return { found: images.length > 0, images };
}

export default async function SummaryPage({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
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