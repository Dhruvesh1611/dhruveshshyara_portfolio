import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!credentials?.username || !credentials?.password) return null;
        if (credentials.username !== adminUsername) return null;

        // If no hash is set yet, allow a default password for first login
        if (!adminPasswordHash) {
          if (credentials.password === '123456') {
            return { id: '1', name: 'Admin', email: 'admin@portfolio.local' };
          }
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, adminPasswordHash);
        if (!isValid) return null;

        return { id: '1', name: 'Admin', email: 'admin@portfolio.local' };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-change-in-production',
});

export { handler as GET, handler as POST };
