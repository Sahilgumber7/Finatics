import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import supabase from "@/lib/supabaseClient"; // Adjust the import path if needed

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error || !data) {
            throw new Error("Invalid credentials");
          }

          return {
            id: data.user.id,
            email: data.user.email,
          };
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // Store user ID in token
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub; // Make user ID available in session
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirect to your custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
