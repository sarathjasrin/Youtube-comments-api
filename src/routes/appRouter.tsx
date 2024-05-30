import React from 'react'
import path from 'path'
import fs from 'fs'
import { renderToString } from 'react-dom/server'
import App from '@/app/pages/app'
import { RouterBaseService } from '@/services/routerBaseService'

export default class AppRouter extends RouterBaseService {
  protected initRoutes(): void {
    this.router.get('/', (req, res) => {
      const appString = renderToString(<App />)

      fs.readFile(
        path.resolve('./src/public/index.html'),
        'utf8',
        (err, data) => {
          if (err) {
            console.error(err)
            return res.status(500).send('An error occurred')
          }
          const html = data.replace(
            '<div id="root"></div>',
            `<div id="root">${appString}</div>`,
          )

          console.log('Test', html)

          return res.send(html)
        },
      )
    })
  }
}
