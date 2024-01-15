import * as z from 'zod';

const ProdutoInventoryWarehouse = z.object({
  locality: z.string(),
  quantity: z.number(),
  type: z.enum(['ECOMMERCE', 'PHYSICAL_STORE'])
})

export const createProdutoValidation = z.object({
  sku: z.number().nonnegative(),
  name: z.string(),
  inventory: z.object({
    warehouses: z.array(ProdutoInventoryWarehouse)
  }),
}).strict();

export const updateProdutoValidation = z.object({
  sku: z.number().nonnegative(),
  name: z.string().optional(),
  inventory: z.object({
    warehouses: z.array(ProdutoInventoryWarehouse)
  }).optional(),
}).strict();

export const readProdutosValidation = z.object({
  sku: z.number().nonnegative(),
}).strict();
