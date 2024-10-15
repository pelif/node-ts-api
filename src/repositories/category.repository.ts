import Category from "../models/category.model";

export default class CategoryRepository {

    async create(item: Category): Promise<Category> {
        return await Category.create(item);
    }


    async update(id: string, item: Category): Promise<{} | { id: string; name: string; }> {
        return await Category.update(item, { where: { id } });
    }


    async delete(id: string): Promise<{} | { id: string; name: string; }> {
        return await Category.destroy({ where: { id } });
    }


    async findById(id: string): Promise<Category | null> {
        return await Category.findOne({ where: { id } });
    }


    async findAll(): Promise<Category[]> {
        return await Category.findAll();
    }
}