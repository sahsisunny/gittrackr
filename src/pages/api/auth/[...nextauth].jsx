import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: [
        'read:user',
        'read:org',
        'repo',
        'user:email',
        'public_repo',
        'admin:repo_hook',
      ],
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token.accessToken}`,
        },
      });
      const user = await userResponse.json();
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      session.user.login = user.login;
      session.user.url = user.url;
      session.user.repos_url = user.repos_url;
      session.user.followers = user.followers;
      session.user.following = user.following;
      session.user.public_repos = user.public_repos;
      session.user.organizations_url = user.organizations_url;
      session.user.created_at = user.created_at;
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
});
