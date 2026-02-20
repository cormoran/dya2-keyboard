// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeNova from "starlight-theme-nova";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://cormoran.github.io",
  base: "dya2-keyboard",
  integrations: [
    starlight({
      plugins: [starlightThemeNova()],
      title: "DYA2",
      logo: {
        src: "./src/assets/dya.svg",
      },
      // TODO: Google Analytics
      //       head: [
      //         {
      //           tag: "script",
      //           attrs: {
      //             src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX",
      //             async: true,
      //           },
      //         },
      //         {
      //           tag: "script",
      //           content: `
      //   window.dataLayer = window.dataLayer || [];
      //   function gtag(){dataLayer.push(arguments);}
      //   gtag('js', new Date());

      //   gtag('config', 'G-XXXXXXXXX');
      //   `,
      //         },
      //       ],
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
