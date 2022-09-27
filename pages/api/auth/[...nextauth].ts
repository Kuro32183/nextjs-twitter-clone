import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const { NEXT_PUBLIC_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

export default NextAuth({
 // Configure one or more authentication providers
 providers: [
   GitHubProvider({
    clientId: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string
   }),
   GoogleProvider({
    clientId: GOOGLE_CLIENT_ID as string,
    clientSecret: GOOGLE_CLIENT_SECRET as string
  })
   // ...add more providers here
 ],
 secret: NEXT_PUBLIC_SECRET as string,
}

);