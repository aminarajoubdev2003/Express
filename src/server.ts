import 'dotenv/config'
import express from 'express'
import productRouter from './routes/product.routes.js'
import { errorMiddleware } from './middlewares/error.middleware.js'

const app = express();
app.use(express.json());

app.use('/products', productRouter)
app.use(errorMiddleware)

app.listen(3080, () => {
  console.log('Server is running on port 3080')
});