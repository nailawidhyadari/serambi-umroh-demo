import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { paket } from "@/data/paket";

export default function sitemap(): MetadataRoute.Sitemap {
  const halaman = ["", "/paket", "/jadwal", "/biaya", "/panduan", "/haji", "/tentang"];
  return [
    ...halaman.map((h) => ({ url: site.url + h, changeFrequency: "weekly" as const, priority: h ? 0.7 : 1 })),
    ...paket.map((p) => ({ url: `${site.url}/paket/${p.slug}`, changeFrequency: "daily" as const, priority: 0.9 })),
  ];
}
