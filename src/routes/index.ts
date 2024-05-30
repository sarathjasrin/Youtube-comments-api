import { Router } from 'express'
import RootRouter from './rootRouter'
import AuthRouter from './authRouter'
import { container } from '@/di'

const router = Router()
const apiRouter = container.get('service.api')
const appRouter = container.get('router.app')
router.use('/', RootRouter)
router.use('/auth', AuthRouter)
router.use('/api', apiRouter.getRouter())
router.use('/app', appRouter.getRouter())

export default router
