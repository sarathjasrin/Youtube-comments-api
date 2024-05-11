import { AuthToken } from '@models/authModel'

declare module 'express-session' {
  interface Session {
    auth?: AuthToken
  }
}
