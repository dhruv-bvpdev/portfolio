import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
  theme: {
    colorScheme: 'auto',
    brandColor: '',
    logo: ''
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      token.image = token.picture
      token.isAdmin = token.email === process.env.ADMIN_EMAIL
      session.user = token as typeof session.user
      return session
    }
  }
})
