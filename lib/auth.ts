import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import bcrypt from 'bcryptjs'
import { db } from './db' // your database setup file
import { sessions, users } from './schema'
import { eq } from 'drizzle-orm'
import { Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
const verifyPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash)
}

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email, Username or Phone', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { identifier, password } = credentials as {
          identifier: string
          password: string
        }

        // Check if the user exists by email
        let user = await db
          .select()
          .from(users)
          .where(eq(users.email, identifier))
          .limit(1)
          .execute()
          .then((rows) => rows[0])

        if (!user) {
          // Check if the user exists by username
          user = await db
            .select()
            .from(users)
            .where(eq(users.name, identifier))
            .limit(1)
            .execute()
            .then((rows) => rows[0])
        }
        if (!user) {
          // Check if the user exists by phone
          user = await db
            .select()
            .from(users)
            .where(eq(users.phone, identifier))
            .limit(1)
            .execute()
            .then((rows) => rows[0])
        }

        if (user && user.password && verifyPassword(password, user.password)) {
          if ((user.email && user.emailVerified) || (user.phone && user.otpVerified)) {
            return {
              id: user.id,
              email: user.email || '',
              name: user.name || '',
              phone: user.phone || '',
              image:user.image||'',
              imageBackground:user.imageBackground||'',
            }
          } else {
            throw new Error('Email or phone not verified.')
          }
        }
        return null
      },
    }),
  ],
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt' as const, // Ensure strategy is typed as 'jwt'
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email || '',
          name: token.name || '',
          phone: token.phone || '',
          image:token.image||'',
          imageBackground:token.imageBackground||''
        }
      }
      return session
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id as string
        token.email = user.email || ''
        token.name = user.name || ''
        token.phone = user.phone || ''
        token.image=user.image||''
        token.imageBackground=user.imageBackground||''
      }
      return token
    },
    async signOut({ user }: { user?: User }) {
      if (user) {
        await db.update(users).set({ otpVerified: false, emailVerified: false }).where(eq(users.id, user.id as string))
        await db.delete(sessions).where(eq(sessions.userId, user.id as string)).execute()
      }
    },
  },
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)

export default auth 
