import { readProdutosValidation } from '~/validations';
import AppErrorHandler from '~/errorHandler/appErrorHandler';
import cache from '~/libs/cache';

const deleteProduto = async (skuProduto: number) => {

  const { sku } = readProdutosValidation.parse({ sku: skuProduto });

  const produtosString = await cache.get('produtos');
  const produtos = (!produtosString) ? [] : JSON.parse(String(produtosString));

  const index = produtos.findIndex((p) => p.sku === sku);

  if (index === -1) {
    throw new AppErrorHandler('Produto não encontrado', 404);
  }

  produtos.splice(index, 1)[0];
  await cache.set('produtos', JSON.stringify(produtos));

  return `Produto com sku [${sku}] deletado`;
};

export default deleteProduto;
