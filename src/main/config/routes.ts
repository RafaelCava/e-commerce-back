import { type Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(path.resolve(__dirname, '..', 'routes'))
    .forEach(async file => {
      console.info('\x1b[32m%s\x1b[0m', `> [${file.replace('.js', '')}] are loaded`)
      await import(`../routes/${file}`).then(route => route.default(router))
    })
}
