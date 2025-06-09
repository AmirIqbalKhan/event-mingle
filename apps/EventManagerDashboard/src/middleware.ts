import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      const role = typeof token?.role === 'string' ? token.role : '';
      return !!token && ['manager', 'admin'].includes(role);
    },
  },
  pages: { signIn: '/login' },
}); 