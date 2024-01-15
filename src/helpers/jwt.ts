import jwt from 'jsonwebtoken';

export const sign = async (payload: any) => {

  const secretKey = (!process.env.TOKEN_SECRET) ? 'gb-back-end-test-key' : process.env.TOKEN_SECRET;
  const expiresIn = (!process.env.TOKEN_EXPIRESIN) ? 86400 : process.env.TOKEN_EXPIRESIN;
  let token: string | undefined;

  token = jwt.sign(
    payload,
    secretKey,
    { expiresIn },
  );
  return token;
};

export const verify = async (token) => {
  const secretKey = (!process.env.TOKEN_SECRET) ? 'gb-back-end-test-key' : process.env.TOKEN_SECRET;
  return jwt.verify(token, secretKey);
};

export const decode = async (token) => jwt.decode(token);
