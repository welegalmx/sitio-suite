import type { MetadataRoute } from "next";

const BASE_URL = "https://suite.welegal.mx";

// Sitio de una sola página (landing). Al agregar rutas nuevas, súmalas aquí.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
