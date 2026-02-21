// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightImageZoom from "starlight-image-zoom";
import starlightThemeNova from "starlight-theme-nova";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://cormoran.github.io",
  base: "dya2-keyboard",
  vite: {
    resolve: {
      dedupe: ["react", "react-dom"],
    },
  },
  image: {
    layout: "constrained",
    objectFit: "contain",
  },
  integrations: [
    starlight({
      plugins: [starlightImageZoom(), starlightThemeNova()],
      title: "DYA2",
      logo: {
        light: "./public/dya-light.svg",
        dark: "./public/dya-dark.svg",
      },
      head: [
        {
          tag: "script",
          attrs: {
            src: "https://www.googletagmanager.com/gtag/js?id=G-86PS6DMGQ0",
            async: true,
          },
        },
        {
          tag: "script",
          content: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-86PS6DMGQ0');
        `,
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/cormoran/dya2-keyboard",
        },
      ],
      sidebar: [
        {
          label: "ビルドガイド",
          autogenerate: { directory: "build-guide/v1" },
        },
        {
          label: "使い方ガイド",
          autogenerate: { directory: "feature-guide" },
        },
        {
          label: "DYA Studio",
          link: "https://studio.dya.cormoran.works",
          attrs: { target: "_blank", rel: "noopener" },
        },
      ],
      customCss: ["./src/styles/custom.css"],
    }),
    react(),
  ],
});
