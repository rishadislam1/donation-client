import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { custom } from "openid-client";

const handler = NextAuth({
  providers: [
    GithubProvider(
      {
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      },
      custom.setHttpOptionsDefaults({
        timeout: 5000,
      })
    ),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    custom.setHttpOptionsDefaults({
      timeout: 5000,
    })
    )
    // ...add more providers here
  ],
});

export { handler as GET, handler as POST };
