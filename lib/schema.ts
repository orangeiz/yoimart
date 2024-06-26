import crypto from 'crypto';
import {
  pgTable,
  text,
  timestamp,
  integer,
  primaryKey,
  boolean,
  serial,
  jsonb,
  index,
  unique,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import type { AdapterAccountType } from 'next-auth/adapters';

// Users table
export const users = pgTable('user', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email'),
  emailVerified: boolean('emailVerified').default(false),
  emailVerificationToken: text('email_verification_token'),
  password: text('password'),
  image: text('image'),
  imageBackground:text('image_background'),
  phone: text('phone'),
  otpVerified: boolean('otp_verified').default(false),
});

// Accounts table for third-party logins
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

// Sessions table
export const sessions = pgTable('session', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires').notNull(),
  sessionToken: text('session_token').notNull(),
});

// Verification tokens table
export const verificationTokens = pgTable('verification_token', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires').notNull(),
}, (verificationToken) => ({
  compoundKey: primaryKey({
    columns: [verificationToken.identifier, verificationToken.token],
  }),
}));
// OTPs table
export const otps = pgTable('otps', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  phone: text('phone'),
  email: text('email'),
  hashOtp: text('hash_otp').notNull(), 
  expiry: timestamp('expiry').notNull(),
});
