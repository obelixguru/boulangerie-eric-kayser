import { ImageResponse } from "next/og";

export const alt =
  "Boulangerie Eric Kayser Louvre-Rivoli — Pains artisanaux premium Paris";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #2C1810 0%, #4A2C1A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#FAF8F5",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            Eric Kayser
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#D4A574",
              textAlign: "center",
              letterSpacing: "4px",
              textTransform: "uppercase" as const,
            }}
          >
            Louvre-Rivoli
          </div>
          <div
            style={{
              width: 80,
              height: 2,
              backgroundColor: "#D4A574",
              marginTop: 10,
              marginBottom: 10,
            }}
          />
          <div
            style={{
              fontSize: 22,
              color: "#FAF8F5",
              textAlign: "center",
              opacity: 0.85,
            }}
          >
            Boulangerie Artisanale Premium — Paris 1er
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
