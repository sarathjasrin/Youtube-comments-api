import express, { Router } from 'express'

export abstract class RouterBaseService {
  protected router: Router

  constructor() {
    this.router = express.Router()
    this.initRoutes()
  }

  protected abstract initRoutes(): void

  public getRouter(): Router {
    return this.router
  }
}
