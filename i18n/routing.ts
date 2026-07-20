import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // "/" y "/en" -> español no lleva prefijo, inglés usa /en
  localePrefix: "as-needed",
});
