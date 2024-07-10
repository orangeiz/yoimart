import crypto from 'crypto';
import { relations } from 'drizzle-orm';
import {
  pgTable,
  text,
  timestamp,
  integer,
  primaryKey,
  boolean,
  index,
  unique,
  pgEnum,
  jsonb,
} from 'drizzle-orm/pg-core';
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
//export const profile=pgTable('profile',{
  //id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  //userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  //name: text('name'),
  //image: text('image'),
  //imageBackground:text('image_background'),
//})
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
export const  storeType=pgEnum('store_type',['food','shop'])
export const stores=pgTable('stores',{
  id:text('id').primaryKey().$defaultFn(()=>crypto.randomUUID()),
  name:text('name').notNull(),
  type:storeType('store_type'),
  ownerId:text('ownerId').notNull().references(()=>users.id,{onDelete:'cascade'}),
  createdAt:timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$defaultFn(() => new Date())
})
export const billboards=pgTable('billboards',{
  id:text('id').primaryKey().$defaultFn(()=>crypto.randomUUID()),
  name:text('name').notNull(),
  storeId:text('storeId').notNull().references(()=>stores.id,{onDelete:'cascade'}),
  imageUrl:text('imageUrl'),
  createdAt:timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$defaultFn(() => new Date())
})

export const colours = pgTable('colours', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  hexValue: text('hex_value'), // Optional: Store color in hex format
});
export const sizes=pgTable('sizes',{
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
});
export const categories = pgTable('categories', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  imageUrl:text('imageUrl'),
});
export const subcategories = pgTable('subcategories', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  imageUrl:text('imageUrl'),
  categoryId: text('category_id').references(() => categories.id),
});


export const coupons = pgTable('coupons', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  code: text('code').notNull(),
  discountPercentage: integer('discount_percentage').notNull(),
  expiryDate: timestamp('expiry_date').notNull(),
  minProductPrice: integer('min_product_price'),
});
export const productcoupons = pgTable('productcoupons', {
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  couponId: text('coupon_id').notNull().references(() => coupons.id, { onDelete: 'cascade' })
}, (productcoupon) => ({
  compoundKey: primaryKey({ columns: [productcoupon.productId, productcoupon.couponId] }),
}));
export const orders = pgTable('orders', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  productId: text('product_id').references(() => products.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull(),
  checkoutprice:integer('checkoutprice'),
  status: text('status'),
  address:text('address'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$defaultFn(() => new Date())
});
export const foodorders = pgTable('foodorders', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  foodId: text('food_id').references(() => deliveryfoods.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull(),
  status: text('status'), 
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$defaultFn(() => new Date())
});

export const products=pgTable('products',{
  id:text('id').primaryKey().$defaultFn(()=>crypto.randomUUID()),
  storeId:text('storeId').notNull().references(()=>stores.id,{onDelete:'cascade'}),
  name:text('name').notNull(),
  description:text('description').notNull(),
  subcategoryId:text('subcategoryId').notNull().references(()=>subcategories.id),
  discountPer:integer('discountPer'),
  ratings:integer('rating'),
  imageUrl:text('imageUrl').array(),
  noAvailable:integer('noAvailable'),
  isArchived:boolean('isArchieved').default(false),
  isFeatured:boolean('isFeatured').default(false),
  createdAt:timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$defaultFn(() => new Date())
})
export const productcolours = pgTable('productcolours', {
  productId: text('productId').notNull().references(() => products.id, { onDelete: 'cascade' }),
  colourId: text('colourId').notNull().references(() => colours.id, { onDelete: 'cascade' })
}, (productcolour) => ({
  compoundKey: primaryKey({ columns: [productcolour.productId, productcolour.colourId] }),
}));

export const productsizes = pgTable('productsizes', {
  productId: text('productId').notNull().references(() => products.id, { onDelete: 'cascade' }),
  sizeId: text('sizeId').notNull().references(() => sizes.id, { onDelete: 'cascade' })
}, (productsize) => ({
  compoundKey: primaryKey({ columns: [productsize.productId, productsize.sizeId] }),
}));
export const genders = pgTable('genders', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull().unique()
});

export const productgenders = pgTable('productgenders', {
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  genderId: text('gender_id').notNull().references(() => genders.id, { onDelete: 'cascade' })
}, (productgender) => ({
  compoundKey: primaryKey({ columns: [productgender.productId, productgender.genderId] }),
}));
export const restaurents=pgTable('restaurents',{
  id:text('id').primaryKey().$defaultFn(()=>crypto.randomUUID()),
  name:text('name').notNull(),
  imageUrl:text('imageUrl'),
  createdAt:timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$defaultFn(() => new Date())
})
export const deliveryfoods=pgTable('deliveryfoods',{
  id:text('id').primaryKey().$defaultFn(()=>crypto.randomUUID()),
  storeId:text('storeId').notNull().references(()=>stores.id,{onDelete:'cascade'}),
  name:text('name').notNull(),
  imageUrl:text('imageUrl').array(),
  subcategoryId:text('subcategoryId').notNull().references(()=>subcategories.id),
  restaurentId:text('restaurentId').notNull().references(()=>restaurents.id),
  createdAt:timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$defaultFn(() => new Date())
})
export const deliveryfoodcoupons = pgTable('deliveryfoodcoupons', {
  deliveryfoodId: text('deliveryfoodId').notNull().references(() => deliveryfoods.id, { onDelete: 'cascade' }),
  couponId: text('couponId').notNull().references(() => coupons.id, { onDelete: 'cascade' })
}, (deliveryfoodcoupon) => ({
  compoundKey: primaryKey({ columns: [deliveryfoodcoupon.deliveryfoodId, deliveryfoodcoupon.couponId] }),
}));
export const ratings = pgTable('ratings', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  productId: text('product_id').references(() => products.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(),
  createdAt:timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$defaultFn(() => new Date())
});

export const reviews = pgTable('reviews', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  productId: text('product_id').references(() => products.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  ratingId: text('rating_id').references(() => ratings.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$defaultFn(() => new Date())
});
export const reviewReactions = pgTable('review_reactions', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  reviewId: text('review_id').references(() => reviews.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  reaction: text('reaction').notNull(),
  createdAt:timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$defaultFn(() => new Date())
});

export const reviewComments = pgTable('review_comments', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  reviewId: text('review_id').references(() => reviews.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$defaultFn(() => new Date())
});

export const messages = pgTable('messages', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  content: text('content').notNull(),
  fileUrl: text('file_url'),
  memberId: text('member_id').references(() => users.id, { onDelete: 'cascade' }),
  deleted: boolean('deleted').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$defaultFn(() => new Date())
});

export const conversations = pgTable('conversation', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  memberOneId: text('member_one_id').references(() => users.id, { onDelete: 'cascade' }),
  memberTwoId: text('member_two_id').references(() => users.id, { onDelete: 'cascade' }),
}, (conversation) => ({
  memberTwoIdIndex: index('member_two_id_idx').on(conversation.memberTwoId),
  uniqueMemberPair: unique('unique_member_pair').on(conversation.memberOneId, conversation.memberTwoId),
}));

export const directMessages = pgTable('direct_messages', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  content: text('content').notNull(),
  fileUrl: text('file_url'),
  memberId: text('member_id').references(() => users.id, { onDelete: 'cascade' }),
  conversationId: text('conversation_id').references(() => conversations.id, { onDelete: 'cascade' }),
  deleted: boolean('deleted').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$defaultFn(() => new Date())
}, (directMessage) => ({
  memberIdIndex: index('member_id_idx').on(directMessage.memberId),
  uniqueMemberMessagePair: unique('unique_directmessage_pair').on(directMessage.memberId, directMessage.conversationId),
}));
export const wishlists = pgTable('wishlists', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  productId: text('product_id').references(() => products.id, { onDelete: 'cascade' }),
});
export const carts = pgTable('carts', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  productId: text('product_id').references(() => products.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull(),
});
export const trackers = pgTable('trackers', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  labels: jsonb('labels').notNull().$type<Array<{ name: string; status: 'pending' | 'completed' }>>(),
  orderId: text('order_id').unique(),
  foodOrderId: text('food_order_id').unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$defaultFn(() => new Date())
});


export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  stores: many(stores),
  orders: many(orders),
  foodOrders: many(foodorders),
  ratings: many(ratings),
  reviews: many(reviews),
  reviewReactions: many(reviewReactions),
  reviewComments: many(reviewComments),
  messages: many(messages),
  wishlists: many(wishlists),
  carts: many(carts),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const storesRelations = relations(stores, ({ one, many }) => ({
  owner: one(users, {
    fields: [stores.ownerId],
    references: [users.id],
  }),
  billboards: many(billboards),
  products: many(products),
  deliveryFoods: many(deliveryfoods),
}));

export const billboardsRelations = relations(billboards, ({ one }) => ({
  store: one(stores, {
    fields: [billboards.storeId],
    references: [stores.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  subcategories: many(subcategories),
}));

export const subcategoriesRelations = relations(subcategories, ({ one, many }) => ({
  category: one(categories, {
    fields: [subcategories.categoryId],
    references: [categories.id],
  }),
  products: many(products),
  deliveryFoods: many(deliveryfoods),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  store: one(stores, {
    fields: [products.storeId],
    references: [stores.id],
  }),
  subcategory: one(subcategories, {
    fields: [products.subcategoryId],
    references: [subcategories.id],
  }),
  productcolours: many(productcolours),
  productsizes: many(productsizes),
  orders: many(orders),
  ratings: many(ratings),
  reviews: many(reviews),
  wishlists: many(wishlists),
  carts: many(carts),
}));
export const couponsProductRelations = relations(coupons, ({ many }) => ({
  productcoupons: many(productcoupons)
}));

export const productCouponsRelations = relations(productcoupons, ({ one }) => ({
  product: one(products, {
    fields: [productcoupons.productId],
    references: [products.id],
  }),
  coupon: one(coupons, {
    fields: [productcoupons.couponId],
    references: [coupons.id],
  }),
}));
export const gendersRelations = relations(genders, ({ many }) => ({
  productgenders: many(productgenders)
}));

export const productGendersRelations = relations(productgenders, ({ one }) => ({
  product: one(products, {
    fields: [productgenders.productId],
    references: [products.id],
  }),
  gender: one(genders, {
    fields: [productgenders.genderId],
    references: [genders.id],
  }),
}));
export const productcoloursRelations = relations(productcolours, ({ one }) => ({
  product: one(products, {
    fields: [productcolours.productId],
    references: [products.id],
  }),
  colour: one(colours, {
    fields: [productcolours.colourId],
    references: [colours.id],
  }),
}));

export const productsizesRelations = relations(productsizes, ({ one }) => ({
  product: one(products, {
    fields: [productsizes.productId],
    references: [products.id],
  }),
  size: one(sizes, {
    fields: [productsizes.sizeId],
    references: [sizes.id],
  }),
}));
export const restaurentsRelations = relations(restaurents, ({ many }) => ({
  deliveryFoods: many(deliveryfoods),
}));

export const deliveryfoodsRelations = relations(deliveryfoods, ({ one, many }) => ({
  store: one(stores, {
    fields: [deliveryfoods.storeId],
    references: [stores.id],
  }),
  subcategory: one(subcategories, {
    fields: [deliveryfoods.subcategoryId],
    references: [subcategories.id],
  }),
  restaurant: one(restaurents, {
    fields: [deliveryfoods.restaurentId],
    references: [restaurents.id],
  }),
  foodOrders: many(foodorders),
}));
export const deliveryfoodcouponsRelations = relations(deliveryfoodcoupons, ({ one }) => ({
  deliveryfood: one(deliveryfoods, {
    fields: [deliveryfoodcoupons.deliveryfoodId],
    references: [deliveryfoods.id],
  }),
  coupon: one(coupons, {
    fields: [deliveryfoodcoupons.couponId],
    references: [coupons.id],
  }),
}));
export const couponsDeliveryFoodRelations = relations(coupons, ({ many }) => ({
  deliveryfoodcoupons: many(deliveryfoodcoupons)
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [orders.productId],
    references: [products.id],
  }),
  tracker: one(trackers, {
    fields: [orders.id],
    references: [trackers.orderId],
  }),
}));

export const foodordersRelations = relations(foodorders, ({ one }) => ({
  user: one(users, {
    fields: [foodorders.userId],
    references: [users.id],
  }),
  food: one(deliveryfoods, {
    fields: [foodorders.foodId],
    references: [deliveryfoods.id],
  }),
  tracker: one(trackers, {
    fields: [foodorders.id],
    references: [trackers.foodOrderId],
  }),
}));
export const trackersRelations = relations(trackers, ({ one }) => ({
  order: one(orders, {
    fields: [trackers.orderId],
    references: [orders.id],
  }),
  foodOrder: one(foodorders, {
    fields: [trackers.foodOrderId],
    references: [foodorders.id],
  }),
}));
export const ratingsRelations = relations(ratings, ({ one, many }) => ({
  user: one(users, {
    fields: [ratings.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [ratings.productId],
    references: [products.id],
  }),
  reviews: many(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one, many }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
  rating: one(ratings, {
    fields: [reviews.ratingId],
    references: [ratings.id],
  }),
  reactions: many(reviewReactions),
  comments: many(reviewComments),
}));

export const reviewReactionsRelations = relations(reviewReactions, ({ one }) => ({
  user: one(users, {
    fields: [reviewReactions.userId],
    references: [users.id],
  }),
  review: one(reviews, {
    fields: [reviewReactions.reviewId],
    references: [reviews.id],
  }),
}));

export const reviewCommentsRelations = relations(reviewComments, ({ one }) => ({
  user: one(users, {
    fields: [reviewComments.userId],
    references: [users.id],
  }),
  review: one(reviews, {
    fields: [reviewComments.reviewId],
    references: [reviews.id],
  }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  member: one(users, {
    fields: [messages.memberId],
    references: [users.id],
  }),
}));

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  memberOne: one(users, {
    fields: [conversations.memberOneId],
    references: [users.id],
  }),
  memberTwo: one(users, {
    fields: [conversations.memberTwoId],
    references: [users.id],
  }),
  directMessages: many(directMessages),
}));

export const directMessagesRelations = relations(directMessages, ({ one }) => ({
  member: one(users, {
    fields: [directMessages.memberId],
    references: [users.id],
  }),
  conversation: one(conversations, {
    fields: [directMessages.conversationId],
    references: [conversations.id],
  }),
}));

export const wishlistsRelations = relations(wishlists, ({ one }) => ({
  user: one(users, {
    fields: [wishlists.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [wishlists.productId],
    references: [products.id],
  }),
}));

export const cartsRelations = relations(carts, ({ one }) => ({
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [carts.productId],
    references: [products.id],
  }),
}));