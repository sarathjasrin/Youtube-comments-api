import React, { lazy, Suspense } from 'react'
import path from 'path'
import fs from 'fs'
import { renderToPipeableStream } from 'react-dom/server'
import { RouterBaseService } from '@/services/routerBaseService'

export default class AppRouter extends RouterBaseService {
  protected initRoutes(): void {
    this.router.get('/ssr-test', (req, res) => {
      const Component = this.loadComponent(req.path)

      fs.readFile(
        path.resolve('./src/public/index.html'),
        'utf8',
        // eslint-disable-next-line consistent-return
        (error, data) => {
          if (error) {
            console.error(error)
            return res.status(500).send('An error occurred')
          }

          let didError = false

          const stream = renderToPipeableStream(
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>,
            {
              onShellReady() {
                res.statusCode = didError ? 500 : 200
                res.setHeader('Content-type', 'text/html')

                const initialHtml = data.replace(
                  '<div id="root"></div>',
                  '<div id="root">',
                )
                res.write(initialHtml)
                console.log(initialHtml)

                stream.pipe(res)
              },
              onShellError() {
                res.statusCode = 500
                res.send('<!doctype html><p>Loading...</p>')
              },
              onAllReady() {
                // If everything is ready, we end the stream
                if (!didError) {
                  res.end('</div></body></html>')
                }
              },
              onError(err) {
                didError = true
                console.error(err)
              },
            },
          )
        },
      )
    })

    this.router.get('*', (req, res) => {
      fs.readFile(
        path.resolve('./src/public/index.html'),
        'utf8',
        // eslint-disable-next-line consistent-return
        (error, data) => {
          if (error) {
            console.error(error)
            return res.status(500).send('An error occurred')
          }

          res.send(data)
        },
      )
    })
  }

  private loadComponent(
    routePath: string,
  ): React.LazyExoticComponent<React.FC> {
    const routesMap: { [key: string]: React.LazyExoticComponent<React.FC> } = {
      '/': lazy(() => import('@/app/pages/app')),
      '/videos': lazy(() => import('@/app/pages/videos')),
    }

    return routesMap[routePath] || lazy(() => import('@/app/pages/notFound'))
  }
}
