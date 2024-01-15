import AppErrorHandler from '~/errorHandler/appErrorHandler';
import createProdutoService from '../create.produto.service';
import { ICreateProduto } from '~/typings';
import cache from '~/libs/cache';

describe('Should test createProduto service', () => {

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

  it('Must create a Produto successfully', async () => {
    const createdProduto = await createProdutoService(request);
    expect(createdProduto).toHaveProperty('sku');
  });

  it('Must throw an exception if there is a Produto with same sku', async () => {
    expect(createProdutoService(request)).rejects.toBeInstanceOf(AppErrorHandler);
  });

});
