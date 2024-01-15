import e from 'express';
import 'express-async-errors';
import produtoRoutes from './produto/produto.routes';
import authRoutes from './auth/auth.routes';
import { ZodError } from 'zod';
import AppErrorHandler from '~/errorHandler/appErrorHandler';
import authMiddleware from '~/middlewares/auth';

const rootRoutes = e.Router();

rootRoutes.use('/produto', authMiddleware, produtoRoutes);
rootRoutes.use('/auth', authRoutes);

rootRoutes.use(
  async (error: Error, _request: e.Request, response: e.Response, _nextFunction: e.NextFunction) => {

    if (error.name && error.name.includes('Token')) {
      return response.status(401).json({ message: 'Token inválido' });
    }

    if (error instanceof ZodError) {
      let errors: string = 'ZodError: ';
      const zodErrors = error.errors;
      zodErrors.forEach(error => {
        errors = errors + `${error.path[0]} ${error.message}`;
      });
      return response.status(400).json({ message: errors })
    }

    if (error instanceof AppErrorHandler) {
      return response.status(error.statusCode).json({ message: error.message })
    }

    return response.status(500).json({ error: 'error' });
  },
);

export default rootRoutes;
