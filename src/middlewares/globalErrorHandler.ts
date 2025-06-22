import { Request, Response, NextFunction } from 'express';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  res.status(400).json({
    message: 'Validation failed',
    success: false,
    error: {
      name: error.name || 'Error',
      errors: error.errors || error,
    },
  });
};

export default globalErrorHandler;
