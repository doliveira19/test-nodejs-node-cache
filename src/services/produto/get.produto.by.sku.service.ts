import { readProdutosValidation } from '~/validations';
import AppErrorHandler from '~/errorHandler/appErrorHandler';
import cache from '~/libs/cache';
import { IProduto } from '~/typings';

const getProdutoBySku = async (skuProduto: number) => {

  const { sku } = readProdutosValidation.parse({ sku: skuProduto });

  let produtos: IProduto[];

  const produtosString = await cache.get('produtos');
  produtos = (!produtosString) ? [] : JSON.parse(String(produtosString));
  const index = produtos.findIndex((p) => p.sku === sku);

  if (index === -1) {
    throw new AppErrorHandler('Produto não encontrado', 404);
  }

  let quantity = 0;
  produtos[index].inventory.warehouses.forEach(produto => {
    quantity += produto.quantity;
  });
  produtos[index].inventory.quantity = quantity;
  produtos[index].isMarketable = (!quantity) ? false : true;

  return produtos[index];

};

export default getProdutoBySku;
