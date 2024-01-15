import cache from '~/libs/cache';

const getAllProdutos = async () => {

  const produtosString = await cache.get('produtos');
  if (!produtosString) {
    return [];
  }
  const produtos = JSON.parse(String(produtosString));

  produtos.forEach(produto => {
    let quantity = 0;
    produto.inventory.warehouses.forEach(cproduto => {
      quantity += cproduto.quantity;
    });
    produto.inventory.quantity = quantity;
    produto.isMarketable = (!quantity) ? false : true;
  });

  return produtos;

};

export default getAllProdutos;
