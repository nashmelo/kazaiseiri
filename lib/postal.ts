export type PostalLookupResult = {
  prefecture: string;
  city: string;
};

type ZipcloudResponse = {
  message: string | null;
  results:
    | Array<{
        address1: string;
        address2: string;
        address3: string;
      }>
    | null;
  status: number;
};

export async function lookupAddressByPostalCode(
  postalCode: string
): Promise<PostalLookupResult> {
  const normalized = postalCode.replace(/\D/g, "");

  if (!/^\d{7}$/.test(normalized)) {
    throw new Error("郵便番号は7桁で入力してください。");
  }

  const res = await fetch(
    `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${normalized}`
  );

  if (!res.ok) {
    throw new Error("住所検索に失敗しました。");
  }

  const data: ZipcloudResponse = await res.json();

  if (data.status !== 200 || !data.results || !data.results[0]) {
    throw new Error("住所が見つかりませんでした。");
  }

  const result = data.results[0];

  return {
    prefecture: result.address1,
    city: `${result.address2}${result.address3}`,
  };
}