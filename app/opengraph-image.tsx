import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — Honda motorcycle spare parts in Pakistan`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: "#131417",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 16,
              backgroundColor: "#CC0000",
              color: "#FFFFFF",
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            H
          </div>
          <div style={{ display: "flex", color: "#FFFFFF", fontSize: 34, fontWeight: 700 }}>
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              color: "#FFFFFF",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Genuine Honda Motorcycle Spare Parts
          </div>
          <div style={{ display: "flex", color: "#9CA3AF", fontSize: 30 }}>
            CD 70 · CD 70 Dream · Pridor · CG 125 · CB 125F · CB 150F
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", width: 90, height: 8, backgroundColor: "#CC0000" }} />
          <div style={{ display: "flex", color: "#9CA3AF", fontSize: 28 }}>
            Search by part, model or number · Order on WhatsApp
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
