import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  theme: {
    colorScheme: 'auto',
    brandColor: '',
    logo: ''
  },
  providers: [
    CredentialsProvider({
      id: 'admin-login',
      name: 'admin login',
      credentials: {
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = {
          id: 'dhruv',
          isAdmin: true
        }

        if (credentials?.password === process.env.AUTH_ADMIN_PASSWORD) {
          return user
        }
        return null
      }
    })
  ]
})
