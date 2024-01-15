import { Request, Response } from 'express';
import authServices from '~/services/auth';

const authController = (() => {
  const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const login = await authServices.login({ email, password });
    res.status(200).send(login);
  };

  return {
    login,
  };
})();

export default authController;
