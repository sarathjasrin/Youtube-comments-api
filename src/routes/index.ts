import { Router } from 'express'
import RootRouter from './rootRouter'
import AuthRouter from './authRouter'
import { container } from '@/di'

const router = Router()
const apiRouter = container.get('service.api')
router.use('/', RootRouter)
router.use('/auth', AuthRouter)
router.use('/api', apiRouter.getRouter())

export default router
