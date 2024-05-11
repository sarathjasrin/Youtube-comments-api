import { Request, Response } from 'express'
import { authMiddleware } from '@middlewares/authMiddleware'
import { RouterBaseService } from '@/services/routerBaseService'
import { container } from '@/di'
import BaseService from '@/services/baseService'

export default class ApiRouter extends RouterBaseService {
  protected initRoutes(): void {
    this.router.get(
      '/:service/:method',
      authMiddleware,
      this.handleRequest.bind(this),
    )
  }

  private async handleRequest(req: Request, res: Response) {
    try {
      const { service, method } = req.params
      const serviceInstance = this.serviceMapper(service)

      if (!serviceInstance) {
        res.status(404).send('Service not found')
        return
      }

      if (!req.session.auth) {
        res.status(401).send('Unauthorized')
        return
      }

      // combine request params and body
      const postData = { ...req.query, ...req.body }

      const response = await serviceInstance.processRequest(method, postData)
      res
        .appendHeader('Content-Type', 'application/json')
        .status(200)
        .send(response)
    } catch (e: unknown) {
      console.error(e)
      res.status(500).send("Couldn't process request")
    }
  }

  private serviceMapper(service: string): BaseService | null {
    switch (service) {
      case 'comments':
        return container.get('service.youtube')
      case 'videos':
        return container.get('service.youtube')
      case 'auth':
        return container.get('service.auth')
      default:
        return null
    }
  }
}
