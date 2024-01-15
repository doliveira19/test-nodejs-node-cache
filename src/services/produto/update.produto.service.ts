import { IUpdateProduto } from '~/typings/';
import { updateProdutoValidation } from '~/validations';
import AppErrorHandler from '~/errorHandler/appErrorHandler';
import cache from '~/libs/cache';
import _ from 'lodash';

const updateProduto = async (data: IUpdateProduto) => {

  const { sku, name, inventory } = updateProdutoValidation.parse(data);

  const produtosString = await cache.get(`produtos`);
  const produtos = (!produtosString) ? [] : JSON.parse(String(produtosString));

  const index = produtos.findIndex((p) => p.sku === sku);

  if (index === -1) {
    throw new AppErrorHandler('Produto não encontrado', 404);
  }

  const updProduto = { name, inventory };
  _.merge(produtos[index], updProduto);

  await cache.set(`produtos`, JSON.stringify(produtos));

  return produtos[index];

};

export default updateProduto;
