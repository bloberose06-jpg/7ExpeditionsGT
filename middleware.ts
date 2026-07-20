import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // No aplicar a archivos estaticos, api, _next, ni /studio (Sanity Studio)
  matcher: ["/((?!api|_next|studio|.*\\..*).*)"],
};
