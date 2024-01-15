import { Request, Response, NextFunction } from 'express';
import { verify } from '~/helpers/jwt';
import AppErrorHandler from '~/errorHandler/appErrorHandler';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    throw new AppErrorHandler('Não Autorizado', 401);
  }

  const [type, token] = req.headers.authorization?.split(' ');

  if (type !== 'Bearer' || !token) {
    throw new AppErrorHandler('Credencial inválida', 401);
  }

  let payload: any;
  payload = await verify(token);

  if (!payload) {
    throw new AppErrorHandler('Credencial inválida', 401);
  }

  return next();
};

export default authMiddleware;
