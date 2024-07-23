import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/", "/auth(.*)"],
  ignoredRoutes: ['/chatbot']
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};