import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FAF8F5 0%, #F0E6D3 100%)",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#2C1810",
              letterSpacing: "-2px",
            }}
          >
            Eric Kayser
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#D4A574",
              letterSpacing: "6px",
              textTransform: "uppercase",
            }}
          >
            Louvre-Rivoli
          </div>
          <div
            style={{
              width: 80,
              height: 2,
              background: "#D4A574",
              marginTop: 8,
              marginBottom: 8,
            }}
          />
          <div
            style={{
              fontSize: 22,
              color: "#6B5B4E",
              maxWidth: 600,
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            Boulangerie artisanale premium — Pains au levain naturel &
            viennoiseries pur beurre
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
