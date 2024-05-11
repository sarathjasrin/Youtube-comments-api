import { Router, Request, Response } from 'express'
import {} from 'morgan'
import AuthService from '@/services/authService'
import container from '@/di'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

router.get('/logout', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err)
    }
    res.send('You are logged out!')
  })
})

router.get(
  '/callback/google',
  async (
    // eslint-disable-next-line
    req: Request<any, any, any, { code?: string; scope?: string }>,
    res: Response,
  ) => {
    const authService = container.get('service.auth') as AuthService
    if (!req.query.code) return res.send('Ivalid Code')
    const authToken = await authService.authorize(req.query.code)
    if (!authToken) return res.send('Auth Error')
    req.session.auth = authToken
    req.session.save((err) => {
      if (err) return res.send('Session Error')
      res.redirect('/')
      return null
    })
    return null
  },
)

export default router
