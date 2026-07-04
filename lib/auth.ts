import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { upsertUser } from "./upsertUser";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },

  callbacks: {
    // On sign-in, upsert user to Supabase and store id + email in JWT
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.sub ?? token.sub;
        token.email = profile.email ?? token.email;
        token.name = profile.name ?? token.name;
        token.picture = profile.image ?? token.picture;

        // Persist to Supabase on every new sign-in
        if (token.id && token.email) {
          await upsertUser({
            id: token.id as string,
            email: token.email as string,
            name: token.name as string | null,
            image: token.picture as string | null,
          });
        }
      }
      return token;
    },

    // Expose id + email on session.user
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
