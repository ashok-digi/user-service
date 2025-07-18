import './tracing.js'

import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import errorHandler from './middlewares/errorHandler.js';
import userRoutes from './routes/userRoutes.js';
import requestLogger from './middlewares/requestLogger.js';
import logger from './utils/logger.js';
import { metricsEndpoint, metricsMiddleware } from './utils/metrics.js';

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(requestLogger)
app.use(metricsMiddleware)

app.use("/", (req, res)=>{
        res.send("CI CD Demo project")
})

app.use("/api/users", userRoutes)

app.use("/metrics", metricsEndpoint)

mongoose.connect(process.env.MONGODB_URI)
        .then(()=> logger.info("MongoDB Connected"))
        .catch((error)=> logger.error("Mongo DB Error: ", error))


app.use(errorHandler)

app.listen(PORT, ()=> logger.info("User service listening on port "+ PORT))