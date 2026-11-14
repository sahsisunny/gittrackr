import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      authorization: {
        params: {
          scope: 'read:user user:email repo read:org',
        },
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (token.accessToken) {
        try {
          const userResponse = await fetch('https://api.github.com/user', {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
              Accept: 'application/vnd.github+json',
            },
          });

          if (userResponse.ok) {
            const user = await userResponse.json();
            const sessionUser = session.user as Record<string, unknown>;
            sessionUser.id = token.id;
            sessionUser.login = user.login;
            sessionUser.url = user.url;
            sessionUser.repos_url = user.repos_url;
            sessionUser.followers = user.followers;
            sessionUser.following = user.following;
            sessionUser.public_repos = user.public_repos;
            sessionUser.organizations_url = user.organizations_url;
            sessionUser.created_at = user.created_at;
            sessionUser.company = user.company;
            sessionUser.blog = user.blog;
            sessionUser.bio = user.bio;
          }
        } catch (err) {
          console.error('[NextAuth] Error enriching session with GitHub user profile:', err);
        }
      }

      (session as { accessToken?: string }).accessToken = token.accessToken as string | undefined;

      return session;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }

      if (account) {
        token.accessToken = account.access_token;
        token.scope = account.scope;
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
