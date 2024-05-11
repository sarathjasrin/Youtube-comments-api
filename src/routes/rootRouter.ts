import { Router, Request, Response } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()

router.get('/test', (req: Request, res: Response) => {
  res.send(`Hello Test`)
})

router.get('/', authMiddleware, (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default router
