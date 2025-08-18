import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/user/*", "/admin/*", "/super-admin/*"],
    },
    sitemap: "https://sdmatrimony.com/sitemap.xml",
  }
}