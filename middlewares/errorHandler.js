import { ZodError } from "zod"
import logger from "../utils/logger.js"

export default async function errorHandler(err, req, res, next){
    const meta = {method: req.method, url: req.originalUrl}
    if(err instanceof ZodError){
        const zodErrors = JSON.parse(err)
        const errorMessage = zodErrors.map(e => ({field: e.path.join("."), message: e.message}))
        logger.error(errorMessage, meta)
        return res.status(400).json({error: errorMessage })
    }
    logger.error(err.message, meta)
    res.status(500).json({error: err.message || "Internal Server Error"})
}