import express, { Application, Request, Response} from "express"
import globalErrorHandler from "./middlewares/globalErrorHandler"
import { bookRouter } from "./app/controller/book.controller"
import { borrowRouter } from "./app/controller/borrow.controller"

const app: Application = express()

app.use(express.json())

app.use('/api' , bookRouter)

app.use("/api/borrow" , borrowRouter)


app.get('/', (req : Request, res : Response) => {
    res.send('Hello World')
})

app.use(globalErrorHandler)

export default app ;