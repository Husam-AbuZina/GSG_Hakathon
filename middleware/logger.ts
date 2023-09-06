import express from 'express';
const loggerMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // const logMessage = `[${new Date().toLocaleString()}] [${req.method}] ${req.path} image URL ${'../images/shadi.jpg'}`
    // console.log(logMessage);
    // res.locals.logMessage = logMessage
    next()
}

export { loggerMiddleware }