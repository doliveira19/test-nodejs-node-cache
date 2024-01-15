import { Request, Response } from 'express';
import produtoServices from '~/services/produto';

const produtoController = (() => {
  const getAllProdutos = async (req: Request, res: Response) => {

    const allProdutos = await produtoServices.getAllProdutos();
    res.status(200).send(allProdutos || {});
  };

  const getProdutoBySku = async (req: Request, res: Response) => {
    const sku = Number(req.params.sku);

    const produto = await produtoServices.getProdutoBySku(sku);
    res.status(200).send(produto);
  };

  const createProduto = async (req: Request, res: Response) => {
    const { sku, name, inventory } = req.body;

    const produto = await produtoServices.createProduto({ sku, name, inventory });
    res.status(200).send(produto);
  };

  const updateProduto = async (req: Request, res: Response) => {
    const sku = Number(req.params.sku);
    const { name, inventory } = req.body;

    const produto = await produtoServices.updateProduto({ sku, name, inventory });
    res.status(200).send(produto);
  };

  const deleteProduto = async (req: Request, res: Response) => {
    const sku = Number(req.params.sku);

    const produto = await produtoServices.deleteProduto(sku);
    res.status(200).send({ message: produto });
  };

  return {
    getAllProdutos,
    getProdutoBySku,
    createProduto,
    updateProduto,
    deleteProduto,
  };
})();

export default produtoController;
