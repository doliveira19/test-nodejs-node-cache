import AppErrorHandler from '~/errorHandler/appErrorHandler';
import { ICreateProduto } from '~/typings';
import updateProduto from '../update.produto.service';
import cache from '~/libs/cache';

describe('Should test updateProduto service', () => {

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

  it('Must updateProduto successfully', async () => {
    await cache.set('produtos', JSON.stringify([{ ...request }]));
    const updatedProduto = await updateProduto({ ...request });
    expect(updatedProduto).toHaveProperty('sku');
  });

  it('Must throw an exception if there is no Produto with sku provided', async () => {
    request.sku = sku + 1;
    expect(updateProduto({ ...request })).rejects.toBeInstanceOf(AppErrorHandler);
  });

});
