/** 今日の日付（端末の現地時刻）を input[type=date] の min 用に YYYY-MM-DD で返す */
export function todayISO(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** 排出方法の値（kintone に入る値）を、画面で選んだときの言葉に直す */
export function disposalMethodLabel(v: string): string {
  if (v === "自分で排出") return "自分で家の外に出す";
  if (v === "排出を希望する") return "家の中から運び出してほしい";
  return v;
}
