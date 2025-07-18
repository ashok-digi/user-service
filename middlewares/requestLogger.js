import logger from "../utils/logger.js"

export default async function requestLogger(req, res, next) {
    const meta = {method: req.method, url: req.originalUrl}
    logger.info("Incomming request", meta)
    next()
}