import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      // // get user login from github
      // const githubUser = await fetch("https://api.github.com/user", {
      //   headers: {
      //     Authorization: `token ${token.accessToken}`,
      //   },
      // }).then((res) => res.json());
      // session.user.login = githubUser.login;

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
    
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);


