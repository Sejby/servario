"use server";

import { connectToDB } from "@/lib/mongodb/mongo";
import User from "@/lib/mongodb/models/user-model";
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDB();

          if (!credentials?.username || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          const user = await User.findOne({ username: credentials.username });

          if (!user) {
            throw new Error("User not found");
          }

          // Pokud porovnáváte hesla přímo (nedoporučeno)
          if (user.password !== credentials.password) {
            throw new Error("Invalid password");
          }

          // Vraťte objekt s potřebnými informacemi
          return {
            id: user._id.toString(), // Convert ObjectId to string
            username: user.username,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Pokud je uživatel právě přihlášen, přidejte jeho údaje
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username;
      session.user.id = token.id;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
