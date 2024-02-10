import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { custom } from "openid-client";

const handler = NextAuth({
  providers: [
    GithubProvider(
      {
        clientId: process.env.GITHUB_ID || "",
        clientSecret: process.env.GITHUB_SECRET || "",
      } as any // Here, 'as any' is used to bypass TypeScript's error regarding the custom function call
    ),
    GoogleProvider(
      {
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      } as any // Here, 'as any' is used to bypass TypeScript's error regarding the custom function call
      // custom.setHttpOptionsDefaults({
      //   timeout: 5000,
      // })
    ),
    // ...add more providers here
  ],
});
