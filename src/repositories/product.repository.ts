import Product from "../models/product.model";

export default class ProductRepository { 

    async create(item: Product): Promise<Product> {
        return await Product.create(item);
    }

    async update(id: string, item: Product): Promise<{} | { id: string; name: string; }> {
        return await Product.update(item, { where: { id } });
    }

    async delete(id: string): Promise<{} | { id: string; name: string; }> {
        return await Product.destroy({ where: { id } });
    }

    async findById(id: string): Promise<Product | null> {
        return await Product.findOne({ where: { id } });
    }

    async findAll(): Promise<Product[]> {
        return await Product.findAll();
    }

}