import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
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
      session.user.company = user.company;
      session.user.blog = user.blog;
      session.user.bio = user.bio;
      return session;
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: any;
      user: any;
      account: any;
    }) {
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
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
