// 旧比較モーダル。
// 現在は本番で未使用。構成見直し用に保管。


"use client";

import React from "react";

type EntryModalProps = {
  open: boolean;
  onStart: () => void;
  onClose: () => void;
};

export default function EntryModal({
  open,
  onStart,
  onClose,
}: EntryModalProps) {
  if (!open) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={titleStyle}>
          粗大ゴミ回収依頼には、
          <br />
          以下の方法がございます。
        </div>

        <div style={contentStyle}>
          <div style={rowStyle}>
            <div style={leftBoxStyle}>役所</div>
            <div style={rightBoxStyle}>
              <div style={tagRowStyle}>
                <span style={labelStyle}>安全性</span>
                <span style={markGoodStyle}>○</span>
              </div>
              <div style={descStyle}>行政の委託業者のため安全</div>

              <div style={tagRowStyle}>
                <span style={labelStyle}>料金</span>
                <span style={markNeutralStyle}>△</span>
              </div>
              <div style={descStyle}>自治体よりは高い</div>

              <div style={tagRowStyle}>
                <span style={labelStyle}>手間</span>
                <span style={markGoodStyle}>○</span>
              </div>
              <div style={descStyle}>
                電話や手続きが必要な場合がある
              </div>
            </div>
          </div>

          <div style={rowStyle}>
            <div style={recommendLeftBoxStyle}>
              <div style={recommendBadgeStyle}>おすすめ</div>
              <div>すっきりん</div>
              <div>から依頼</div>
            </div>
            <div style={rightBoxStyle}>
              <div style={tagRowStyle}>
                <span style={labelStyle}>安全性</span>
                <span style={markGoodStyle}>○</span>
              </div>
              <div style={descStyle}>行政発行の許可業者のみで安全</div>

              <div style={tagRowStyle}>
                <span style={labelStyle}>料金</span>
                <span style={markNeutralStyle}>△</span>
              </div>
              <div style={descStyle}>相見積もりで比較しやすい</div>

              <div style={tagRowStyle}>
                <span style={labelStyle}>手間</span>
                <span style={markGoodStyle}>○</span>
              </div>
              <div style={descStyle}>
                LINEで簡単。
                <br />
                相見積もりにより地域最安値、また最短3日後の回収が可能。
                <br />
                キャッシュレス決済にも対応。
              </div>
            </div>
          </div>
        </div>

        <button type="button" onClick={onStart} style={primaryButtonStyle}>
          すっきりんから依頼を行う
        </button>

        <button type="button" onClick={onClose} style={secondaryButtonStyle}>
          キャンセル
        </button>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(28, 43, 74, 0.28)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
  zIndex: 1000,
  boxSizing: "border-box",
};

const modalStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 520,
  maxHeight: "90vh",
  overflowY: "auto",
  background: "#fffafb",
  borderRadius: 20,
  padding: "26px 18px 24px",
  boxSizing: "border-box",
  boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: 18,
  fontWeight: 900,
  color: "var(--pink-strong)",
  lineHeight: 1.6,
  marginBottom: 20,
};

const contentStyle: React.CSSProperties = {
  marginBottom: 20,
};

const rowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "140px 1fr",
  gap: 14,
  marginBottom: 18,
  alignItems: "stretch",
};

const leftBoxStyle: React.CSSProperties = {
  background: "#f06292",
  color: "#fff",
  fontSize: 18,
  fontWeight: 900,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 10,
  minHeight: 170,
};

const recommendLeftBoxStyle: React.CSSProperties = {
  background: "var(--pink-strong)",
  color: "#fff",
  fontSize: 18,
  fontWeight: 900,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 10,
  minHeight: 240,
  position: "relative",
  gap: 4,
};

const recommendBadgeStyle: React.CSSProperties = {
  position: "absolute",
  top: 14,
  background: "#fff",
  color: "var(--pink-strong)",
  fontSize: 13,
  fontWeight: 900,
  borderRadius: 999,
  padding: "6px 14px",
  border: "2px solid #f7c6d8",
};

const rightBoxStyle: React.CSSProperties = {
  background: "#fffafb",
  color: "#1c2b4a",
  padding: "4px 2px",
  boxSizing: "border-box",
};

const tagRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 6,
};

const labelStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 90,
  padding: "8px 12px",
  background: "#fde7ef",
  color: "var(--pink-strong)",
  fontSize: 16,
  fontWeight: 900,
  borderRadius: 8,
};

const markGoodStyle: React.CSSProperties = {
  color: "var(--pink-strong)",
  fontSize: 30,
  fontWeight: 900,
  lineHeight: 1,
};

const markNeutralStyle: React.CSSProperties = {
  color: "#7b8794",
  fontSize: 28,
  fontWeight: 900,
  lineHeight: 1,
};

const descStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.55,
  fontWeight: 700,
  color: "#1c2b4a",
  marginBottom: 14,
};

const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 999,
  background: "var(--pink-strong)",
  color: "#fff",
  fontSize: 18,
  fontWeight: 900,
  padding: "18px 16px",
  cursor: "pointer",
  marginBottom: 14,
};

const secondaryButtonStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 999,
  background: "#fff",
  color: "var(--pink-strong)",
  fontSize: 18,
  fontWeight: 900,
  padding: "18px 16px",
  cursor: "pointer",
  border: "3px solid var(--pink-strong)",
};