import AppErrorHandler from '~/errorHandler/appErrorHandler';
import { ICreateProduto } from '~/typings';
import deleteProduto from '../delete.produto.service';
import cache from '~/libs/cache';

describe('Should test deleteProduto service', () => {

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

  it('Must deleteProduto successfully', async () => {
    await cache.set('produtos', JSON.stringify([{ ...request }]));
    const deletedProduto = await deleteProduto(sku);
    expect(deletedProduto).toEqual(`Produto com sku [${sku}] deletado`);
  });

  it('Must throw an exception if there is no Produto with sku provided', async () => {
    expect(deleteProduto(sku + 1)).rejects.toBeInstanceOf(AppErrorHandler);
  });

});
