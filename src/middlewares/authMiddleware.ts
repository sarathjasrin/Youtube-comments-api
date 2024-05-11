import { Request, Response, NextFunction } from 'express'
import container from '@/di'

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.session && req.session.auth) {
    const authService = container.get('service.auth')
    authService.setUserToken = req.session.auth
    authService.refreshTokenIfExpired(req).then(() => next())
  } else {
    const YoutubeRepository = container.get('repository.youtube')
    const authUrl = YoutubeRepository.getAuthUrl()
    res.redirect(authUrl)
  }
}

export const test = 'test'
