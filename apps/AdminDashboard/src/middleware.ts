import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      const role = typeof token?.role === 'string' ? token.role : '';
      return !!token && role === 'admin';
    },
  },
  pages: { signIn: '/login' },
}); 