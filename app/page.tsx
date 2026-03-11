"use client";

import React, { useState, useEffect } from "react";
import liff from "@line/liff";
import styles from "./page.module.css";

const LIFF_ID = "2009412342-JGZ5KiR6";

type FormData = {
  name: string;
  phone: string;

  postalCode: string;
  prefecture: string;
  city: string;
  address1: string;

  buildingType: string;
  parking: "あり" | "なし" | "";
  elevator: "あり" | "なし" | "";

  service: "不用品回収" | "部屋を丸ごと片付け" | "引越し" | "";

  movePostalCode: string;
  movePrefecture: string;
  moveCity: string;
  moveAddress1: string;

  items: string;
  images: File[];

  airconRemoval: "ある" | "ない";

  pickupDate1: string;
  pickupDate2: string;
  pickupDate3: string;

  contactMethod: "LINE" | "電話";
};

const initialFormData: FormData = {
  name: "",
  phone: "",

  postalCode: "",
  prefecture: "",
  city: "",
  address1: "",

  buildingType: "",
  parking: "",
  elevator: "",

  service: "",

  movePostalCode: "",
  movePrefecture: "",
  moveCity: "",
  moveAddress1: "",

  items: "",
  images: [],

  airconRemoval: "ない",

  pickupDate1: "",
  pickupDate2: "",
  pickupDate3: "",

  contactMethod: "LINE",
};

export default function Home() {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  const [postalStatus, setPostalStatus] = useState<string | null>(null);
  const [movePostalStatus, setMovePostalStatus] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const formatDateTimeJP = (value: string) => {
    if (!value) return "なし";

    const d = new Date(value);
    if (isNaN(d.getTime())) return value;

    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    const h = d.getHours();
    const min = d.getMinutes().toString().padStart(2, "0");

    return `${y}年${m}月${day}日${h}時${min}分`;
  };

  useEffect(() => {
    const init = async () => {
      try {
        await liff.init({ liffId: LIFF_ID });

        setDebugInfo(
          JSON.stringify(
            {
              isLoggedIn: liff.isLoggedIn(),
              isInClient: liff.isInClient(),
              context: liff.getContext(),
            },
            null,
            2
          )
        );
      } catch (err) {
        setDebugInfo(`LIFF init error: ${String(err)}`);
      }
    };

    init();
  }, []);

  const lookupAddressFromPostalCode = async (zipcode: string) => {
    if (!/^\d{7}$/.test(zipcode)) return;

    setPostalStatus("住所を検索しています…");
    try {
      const res = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`
      );
      const data = await res.json();

      if (data.status === 200 && data.results?.[0]) {
        const r = data.results[0];
        setForm((p) => ({
          ...p,
          prefecture: r.address1,
          city: `${r.address2}${r.address3}`,
        }));
        setPostalStatus(null);
      } else {
        setPostalStatus("住所が見つかりませんでした");
      }
    } catch {
      setPostalStatus("住所検索に失敗しました");
    }
  };

  const lookupMoveAddressFromPostalCode = async (zipcode: string) => {
    if (!/^\d{7}$/.test(zipcode)) return;

    setMovePostalStatus("住所を検索しています…");
    try {
      const res = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`
      );
      const data = await res.json();

      if (data.status === 200 && data.results?.[0]) {
        const r = data.results[0];
        setForm((p) => ({
          ...p,
          movePrefecture: r.address1,
          moveCity: `${r.address2}${r.address3}`,
        }));
        setMovePostalStatus(null);
      } else {
        setMovePostalStatus("住所が見つかりませんでした");
      }
    } catch {
      setMovePostalStatus("住所検索に失敗しました");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "postalCode") {
      const v = value.replace(/\D/g, "");
      setForm((p) => ({ ...p, postalCode: v }));
      if (v.length === 7) lookupAddressFromPostalCode(v);
      return;
    }

    if (name === "movePostalCode") {
      const v = value.replace(/\D/g, "");
      setForm((p) => ({ ...p, movePostalCode: v }));
      if (v.length === 7) lookupMoveAddressFromPostalCode(v);
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({
      ...p,
      images: Array.from(e.target.files || []),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.phone || !form.service || !form.pickupDate1) {
      setError("お名前・電話番号・ご希望サービス・第1希望日時は必須です。");
      scrollToTop();
      return;
    }

    if (
      !form.postalCode ||
      !/^\d{7}$/.test(form.postalCode) ||
      !form.prefecture ||
      !form.city ||
      !form.address1
    ) {
      setError("回収現場住所（郵便番号・都道府県・市区町村・住所）は必須です。");
      scrollToTop();
      return;
    }

    if (
      form.service === "引越し" &&
      (!form.movePostalCode ||
        !/^\d{7}$/.test(form.movePostalCode) ||
        !form.movePrefecture ||
        !form.moveCity ||
        !form.moveAddress1)
    ) {
      setError("引越し先住所（郵便番号・都道府県・市区町村・住所）は必須です。");
      scrollToTop();
      return;
    }

    if (!form.items.trim()) {
      setError("回収・引越しする物の種類・個数は必須です。");
      scrollToTop();
      return;
    }

    const summaryText = [
      "📩 お問い合わせを受け付けました",
      "",
      "以下の内容で承りました。",
      "内容を確認のうえ、担当者よりご連絡いたします。",
      "※画像をトーク画面にお貼りいただくと、より正確なお見積もりが可能です。",
      "",
      "———",
      `【お名前】${form.name}`,
      `【電話番号】${form.phone}`,
      `【やり取り】${
        form.contactMethod === "LINE"
          ? "LINEでやり取りしたい"
          : "電話でやり取りしたい"
      }`,
      "",
      "■ ご希望サービス",
      form.service,
      "",
      "■ 回収現場住所",
      `〒${form.postalCode}`,
      `${form.prefecture}${form.city}${form.address1}`,
      "",
      `【建物種類】${form.buildingType || "未入力"}`,
      `【駐車場】${form.parking || "未入力"}`,
      `【エレベーター】${form.elevator || "未入力"}`,
      "",
      form.service === "引越し"
        ? [
            "■ 引越し先住所",
            `〒${form.movePostalCode}`,
            `${form.movePrefecture}${form.moveCity}${form.moveAddress1}`,
            "",
          ].join("\n")
        : "",
      "■ 回収・引越しする物の種類・個数",
      form.items,
      `【エアコン取り外し】${form.airconRemoval}`,
      "",
      "■ お引き取り希望日時",
      `第1希望：${formatDateTimeJP(form.pickupDate1)}`,
      `第2希望：${formatDateTimeJP(form.pickupDate2)}`,
      `第3希望：${formatDateTimeJP(form.pickupDate3)}`,
      "",
      "———",
      "",
      "※ このトークでそのままやり取りできます。",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      setSubmitting(true);

      setDebugInfo(
        JSON.stringify(
          {
            phase: "before send",
            isLoggedIn: liff.isLoggedIn(),
            isInClient: liff.isInClient(),
            context: liff.getContext(),
          },
          null,
          2
        )
      );

      if (!liff.isInClient()) {
        throw new Error("LINEアプリ内で開かれていません");
      }

      await liff.sendMessages([{ type: "text", text: summaryText }]);

      setDebugInfo(
        JSON.stringify(
          {
            phase: "send success",
            isLoggedIn: liff.isLoggedIn(),
            isInClient: liff.isInClient(),
            context: liff.getContext(),
          },
          null,
          2
        )
      );

      setSubmitted(true);
      setForm(initialFormData);
      setPostalStatus(null);
      setMovePostalStatus(null);
      scrollToTop();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setDebugInfo(`submit error: ${message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      className={styles.main}
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: 16,
        boxSizing: "border-box",
        color: "#111",
      }}
    >
      <div
        className={styles.center}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 480,
            background: "white",
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
          }}
        >
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
            不用品回収・片付けご相談フォーム
          </h1>

          <p style={{ fontSize: 13, color: "#555", marginBottom: 16 }}>
            必要事項をご入力のうえ送信してください。
            <br />
            担当者よりLINEまたはお電話でご連絡いたします。
          </p>

          {error && (
            <div
              style={{
                background: "#ffe5e5",
                color: "#b00020",
                padding: "8px 10px",
                borderRadius: 6,
                fontSize: 12,
                marginBottom: 12,
              }}
            >
              {error}
            </div>
          )}

          {debugInfo && (
            <pre
              style={{
                background: "#f5f5f5",
                color: "#333",
                padding: 8,
                borderRadius: 6,
                fontSize: 11,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                marginBottom: 12,
              }}
            >
              {debugInfo}
            </pre>
          )}

          {submitted && (
            <div
              style={{
                background: "#e6f7ff",
                color: "#0050b3",
                padding: "8px 10px",
                borderRadius: 6,
                fontSize: 12,
                marginBottom: 12,
              }}
            >
              送信ありがとうございました。トーク画面をご確認ください。
              <br />
              <span style={{ fontSize: 11, color: "#555" }}>
                ※画像をトーク画面にお貼りいただくと、より正確なお見積もりが可能です。
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <SectionTitle label="お客様情報" />

            <Field label="お名前" required>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="エヅリン太郎"
                style={inputStyle}
              />
            </Field>

            <Field label="電話番号（ハイフンなし）" required>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                placeholder="09012345678"
                style={inputStyle}
              />
            </Field>

            <SectionTitle label="回収現場住所" />

            <Field label="郵便番号（7桁）" required>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                type="text"
                placeholder="3210123"
                inputMode="numeric"
                style={inputStyle}
              />
              {postalStatus && (
                <div style={{ marginTop: 4, fontSize: 11, color: "#888" }}>
                  {postalStatus}
                </div>
              )}
            </Field>

            <Field label="都道府県" required>
              <input
                name="prefecture"
                value={form.prefecture}
                onChange={handleChange}
                type="text"
                style={inputStyle}
              />
            </Field>

            <Field label="市区町村" required>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                type="text"
                style={inputStyle}
              />
            </Field>

            <Field label="住所（番地など）" required>
              <input
                name="address1"
                value={form.address1}
                onChange={handleChange}
                type="text"
                style={inputStyle}
              />
            </Field>

            <Field label="建物種類（任意）">
              <select
                name="buildingType"
                value={form.buildingType}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">選択してください</option>
                <option value="戸建て">戸建て</option>
                <option value="マンション・アパート">マンション・アパート</option>
                <option value="倉庫">倉庫</option>
                <option value="オフィス">オフィス</option>
                <option value="その他">その他</option>
              </select>
            </Field>

            <Field label="駐車場の有無（任意）">
              <select
                name="parking"
                value={form.parking}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">選択してください</option>
                <option value="あり">あり</option>
                <option value="なし">なし</option>
              </select>
            </Field>

            <Field label="エレベーターの有無（任意）">
              <select
                name="elevator"
                value={form.elevator}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">選択してください</option>
                <option value="あり">あり</option>
                <option value="なし">なし</option>
              </select>
            </Field>

            <SectionTitle label="ご希望内容" />

            <Field label="ご希望のサービス" required>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">選択してください</option>
                <option value="不用品回収">不用品回収</option>
                <option value="部屋を丸ごと片付け">部屋を丸ごと片付け</option>
                <option value="引越し">引越し</option>
              </select>
            </Field>

            {form.service === "引越し" && (
              <>
                <SectionTitle label="引越し先住所" />

                <Field label="郵便番号（7桁）" required>
                  <input
                    name="movePostalCode"
                    value={form.movePostalCode}
                    onChange={handleChange}
                    type="text"
                    inputMode="numeric"
                    style={inputStyle}
                  />
                  {movePostalStatus && (
                    <div style={{ marginTop: 4, fontSize: 11, color: "#888" }}>
                      {movePostalStatus}
                    </div>
                  )}
                </Field>

                <Field label="都道府県" required>
                  <input
                    name="movePrefecture"
                    value={form.movePrefecture}
                    onChange={handleChange}
                    type="text"
                    style={inputStyle}
                  />
                </Field>

                <Field label="市区町村" required>
                  <input
                    name="moveCity"
                    value={form.moveCity}
                    onChange={handleChange}
                    type="text"
                    style={inputStyle}
                  />
                </Field>

                <Field label="住所（番地など）" required>
                  <input
                    name="moveAddress1"
                    value={form.moveAddress1}
                    onChange={handleChange}
                    type="text"
                    style={inputStyle}
                  />
                </Field>
              </>
            )}

            <Field
              label={
                <>
                  回収・引越しする物の種類・個数
                  <br />
                  （画像はトーク画面にお送りください）
                </>
              }
              required
            >
              <textarea
                name="items"
                value={form.items}
                onChange={handleChange}
                rows={4}
                placeholder="例:冷蔵庫1台、洗濯機1台、タンス2棹"
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </Field>

            <Field label="エアコンの取り外し作業（任意）">
              <select
                name="airconRemoval"
                value={form.airconRemoval}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="ない">ない</option>
                <option value="ある">ある</option>
              </select>
            </Field>

            <SectionTitle label="お引き取り希望日時" />

            <Field label="第1希望（必須）" required>
              <input
                type="datetime-local"
                name="pickupDate1"
                value={form.pickupDate1}
                onChange={handleChange}
                style={dateTimeInputStyle}
              />
            </Field>

            <Field label="第2希望（任意）">
              <input
                type="datetime-local"
                name="pickupDate2"
                value={form.pickupDate2}
                onChange={handleChange}
                style={dateTimeInputStyle}
              />
            </Field>

            <Field label="第3希望（任意）">
              <input
                type="datetime-local"
                name="pickupDate3"
                value={form.pickupDate3}
                onChange={handleChange}
                style={dateTimeInputStyle}
              />
            </Field>

            <SectionTitle label="やり取り方法" />

            <Field label="連絡手段（任意）">
              <select
                name="contactMethod"
                value={form.contactMethod}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="LINE">LINEでやり取りしたい</option>
                <option value="電話">電話でやり取りしたい</option>
              </select>
            </Field>

            <button
              type="submit"
              disabled={submitting}
              style={submitButtonStyle(submitting)}
            >
              {submitting ? "送信中..." : "この内容で送信する"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

type FieldProps = {
  label: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
};

const Field: React.FC<FieldProps> = ({ label, required, children }) => (
  <div style={{ marginBottom: 10 }}>
    <label
      style={{
        display: "block",
        fontSize: 12,
        fontWeight: 600,
        marginBottom: 4,
        color: "#111",
      }}
    >
      {label}
      {required && <span style={{ color: "#d00", marginLeft: 4 }}>＊</span>}
    </label>
    {children}
  </div>
);

const SectionTitle: React.FC<{ label: string }> = ({ label }) => (
  <h2
    style={{
      fontSize: 13,
      fontWeight: 700,
      marginTop: 18,
      marginBottom: 6,
      borderLeft: "3px solid #00c300",
      paddingLeft: 8,
      color: "#111",
    }}
  >
    {label}
  </h2>
);

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 6,
  border: "1px solid #ddd",
  fontSize: 13,
  boxSizing: "border-box",
  background: "#fff",
  color: "#111",
};

const dateTimeInputStyle: React.CSSProperties = {
  ...inputStyle,
  width: "100%",
};

const submitButtonStyle = (submitting: boolean): React.CSSProperties => ({
  width: "100%",
  marginTop: 12,
  padding: "10px 16px",
  borderRadius: 999,
  border: "none",
  background: submitting ? "#999" : "#00c300",
  color: "white",
  fontWeight: 700,
  fontSize: 15,
  cursor: submitting ? "default" : "pointer",
});