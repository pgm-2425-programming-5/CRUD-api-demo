import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { users } from "./users";

export const authOptions: NextAuthOptions = {
  providers: [
    // Credentials Provider for Email and Password Login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "role" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        const user = users.find((user) => user.email === email);

        if (user && user.password) {
          const isValid = await bcrypt.compare(password, user.password);
          console.log("Password is valid:", isValid);
          if (isValid) {
            return { id: user.id, name: user.name, email: user.email, role: user.role };
          }
        }

        // If no user is found or password is incorrect
        return null;
      },
    }),
    // GitHub Provider for OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    // }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Persist the GitHub ID to the token right after sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        // to copy the whole user object to the token
        // token = { ...token, ...user }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as number;
        session.user.role = token.role as "admin" | "user";
      }
      // to copy the the whole token to the session
      // session.user = {
      //   ...session.user,
      //   ...token
      // }
      return session;
    },
  },
};
