import AppErrorHandler from '~/errorHandler/appErrorHandler';
import { ICreateProduto } from '~/typings';
import getProdutoBySku from '../get.produto.by.sku.service';
import cache from '~/libs/cache';

describe('Should test getProduto service', () => {

  let request: ICreateProduto;
  const sku = 43264;

  beforeAll(async () => {
    await cache.del('produtos');
    request = {
      sku: 43264,
      name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
      inventory: {
        warehouses: [
          {
            locality: 'SP',
            quantity: 12,
            type: 'ECOMMERCE'
          },
          {
            locality: 'MOEMA',
            quantity: 3,
            type: 'PHYSICAL_STORE'
          }
        ]
      },
    }
  });

  it('Must get a Produto successfully', async () => {
    await cache.set('produtos', JSON.stringify([{ ...request }]));
    const produto = await getProdutoBySku(sku);
    expect(produto).toHaveProperty('sku');
  });

  it('Must throw an exception if there is no Produto with sku provided', async () => {
    expect(getProdutoBySku(sku + 1)).rejects.toBeInstanceOf(AppErrorHandler);
  });

});
