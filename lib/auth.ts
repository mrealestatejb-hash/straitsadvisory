import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      // Check if this is the very first user — make them admin
      const userCount = await prisma.user.count();
      if (userCount === 0) {
        // Will be created by the adapter, we update after
        return true;
      }

      return true;
    },
    async session({ session, user }) {
      // Fetch the full user to get role and approved status
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      if (dbUser) {
        session.user.id = dbUser.id;
        session.user.role = dbUser.role;
        session.user.approved = dbUser.approved;
      }

      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // First user ever → auto-approve as ADMIN
      const userCount = await prisma.user.count();
      if (userCount === 1) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: 'ADMIN', approved: true },
        });
      }
    },
  },
});
