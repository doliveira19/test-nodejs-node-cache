import { sign } from '~/helpers/jwt';
import { LoginData } from '~/typings/';
import { loginValidation } from '~/validations';
import AppErrorHandler from '~/errorHandler/appErrorHandler';

const loginUser = {
  email: 'teste@teste.com.br',
  password: 'teste'
}

const login = async (data: LoginData) => {

  const { email, password } = loginValidation.parse(data);

  if (email !== loginUser.email || password !== loginUser.password) {
    throw new AppErrorHandler('Dados de login inválidos', 401);
  }

  const token = await sign(data);

  return { token };

};

export default login;
