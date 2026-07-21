import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bisacom — Product Designer",
    short_name: "Bisacom",
    description: "Product design portfolio of Bismark Apenkwah.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f9fc",
    theme_color: "#2d5bff",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
