import { Router } from 'express';
import produtoController from '../../controllers/produto/produto.controller';

const router = Router();

router.get('/', produtoController.getAllProdutos);
router.get('/:sku', produtoController.getProdutoBySku);
router.put('/:sku', produtoController.updateProduto);
router.post('/', produtoController.createProduto);
router.delete('/:sku', produtoController.deleteProduto);

export default router;
