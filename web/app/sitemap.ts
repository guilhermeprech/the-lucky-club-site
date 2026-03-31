import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://theluckyclub.com.br";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/collection`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/desapegue`,
      lastModified: new Date(),
    },
  ];
}