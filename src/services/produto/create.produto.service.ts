import { ICreateProduto } from '~/typings/';
import { createProdutoValidation } from '~/validations';
import AppErrorHandler from '~/errorHandler/appErrorHandler';
import cache from '~/libs/cache';

const createProduto = async (data: ICreateProduto) => {

  const { sku, name, inventory } = createProdutoValidation.parse(data);

  const produtosString = await cache.get('produtos');
  const produtos = (!produtosString) ? [] : JSON.parse(String(produtosString));

  const index = produtos.findIndex((p) => p.sku === sku);

  if (index !== -1) {
    throw new AppErrorHandler('Já existe um produto cadastrado com esse sku', 400);
  }

  const newProduto = { sku, name, inventory };
  produtos.push(newProduto);

  await cache.set('produtos', JSON.stringify(produtos));

  return newProduto;

};

export default createProduto;
