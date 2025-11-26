import { Request, Response, NextFunction } from 'express'

export const performanceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now()

  res.on('finish', () => {
    const endTime = Date.now()
    const processingTime = endTime - startTime
    
    res.setHeader('X-Processing-Time', `${processingTime}ms`)
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${req.method}] ${req.path} - Tempo de processamento: ${processingTime}ms`)
    }
  })

  next()
}
