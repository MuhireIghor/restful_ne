import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import swaggerUi from "swagger-ui-express";
import swaggerFile from './swagger/doc/swagger.json';
import { corsFunction } from './utils/cors.utils';
import { ENDPOINT } from './utils/core.util';
import route from './routes';
import { checkDbConnection } from './config/db.config';
import { httpLogger } from './middleware/http-logger.middleware';
import logger from './utils/logger';
config()
const port = process.env.PORT || 5433;
const app = express();
app.use(httpLogger)
app.use(cors());
app.use(corsFunction)
app.use(express.json());
checkDbConnection()

app.get('/', async (req, res) => {
    return res.status(200).json({
        message: "Welcome to our apis",

    })
})
app.use(`${ENDPOINT}`, route)
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('*', async (req: Request, res: Response) => {
    return res.status(404).json({
        message: "Route not found",
        data: null
    })
})
let server:any;
checkDbConnection().then(()=>{
    server = app.listen(port, () => {
        logger.info(`Server running on port ${port} in ${process.env.NODE_ENV} environment`)
    })
})
.catch((error) => {
    logger.error('Unable to connect to the database:', error)
  })

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`)
// })


