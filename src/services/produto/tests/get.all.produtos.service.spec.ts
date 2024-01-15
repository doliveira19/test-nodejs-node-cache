import { ICreateProduto } from '~/typings';
import getAllProdutos from '../get.all.produtos.service';
import cache from '~/libs/cache';

describe('Should test getAllProdutos service', () => {

  let request: ICreateProduto;

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

  it('Must getAllProdutos successfully', async () => {
    await cache.set('produtos', JSON.stringify([{ ...request }]));
    const produtos = await getAllProdutos();
    expect(produtos[0]).toHaveProperty('sku');
  });

});
