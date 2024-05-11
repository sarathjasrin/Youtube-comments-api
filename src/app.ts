import express from 'express'
import session from 'express-session'
import sessionFileStore from 'session-file-store'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import routers from './routes'

const app = express()
const port = 3000

const FileStore = sessionFileStore(session)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(
  session({
    store: new FileStore({
      ttl: 60 * 60 * 24 * 7,
    }),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
)

app.use('/', routers)

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
