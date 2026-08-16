import { ImageResponse } from "next/og";
import { getAllGuideArticles } from "@/lib/guide";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ebenezer Real Estate Services — the overseas owner's guide";

export function generateImageMetadata() {
  return [{ id: "og", size, contentType }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getAllGuideArticles().find((a) => a.slug === slug);
  const title = article?.title ?? "The overseas owner's guide";
  const category = article?.category ?? "Guide";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#E9ECF1",
          padding: "76px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 5,
              color: "#778394",
              textTransform: "uppercase",
            }}
          >
            {category} · Ebenezer Real Estate Services
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 800,
              color: "#141C28",
              lineHeight: 1.15,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 52, height: 7, backgroundColor: "#BF5700" }} />
          <div style={{ display: "flex", fontSize: 23, color: "#4A5768" }}>The overseas owner&apos;s guide</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
