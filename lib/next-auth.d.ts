import { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface User extends DefaultUser {
    phone?: string
    image?:string
    imageBackground?:string
  }
  
  interface Session {
    user?: {
      id: string
      email: string
      name: string
      phone: string
      image?:string
      imageBackground?:string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    name: string
    phone: string
    image?:string
    imageBackground?:string
  }
}