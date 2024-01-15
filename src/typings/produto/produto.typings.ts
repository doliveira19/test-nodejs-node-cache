interface IProdutoInventory {
    quantity?: number,
    warehouses: IProdutoInventoryWarehouse[]
}

interface IProdutoInventoryWarehouse {
    locality: string,
    quantity: number,
    type: 'ECOMMERCE' | 'PHYSICAL_STORE'
}

export interface ICreateProduto {
    sku: number,
    name: string,
    inventory: IProdutoInventory
}

export interface IUpdateProduto {
    sku: number,
    name?: string,
    inventory?: IProdutoInventory
};

export interface IProduto {
    sku: number,
    name: string,
    inventory: IProdutoInventory,
    isMarketable?: boolean
}
