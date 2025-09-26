import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date()

  return [
    {
      url: "/",
      lastModified: today,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "/terms-and-conditions",
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "/privacy-policy",
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "/cancellation-and-refund-policy",
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "/shipping-and-delivery-policy",
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "/contact-us",
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ]
}