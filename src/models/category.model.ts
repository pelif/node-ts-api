import {
    Column, 
    HasMany, 
    Model, 
    PrimaryKey, 
    Table
} from "sequelize-typescript";

import Product from "./product.model";

interface CategoryAttributes {
    id: string;
    name: string;
}

@Table({
    tableName: "categories",
    timestamps: false
})
export default class Category extends Model<CategoryAttributes> {

    @PrimaryKey
    @Column
    declare id: string;

    @Column
    declare name: string;

    @HasMany(() => Product)
    declare products: Product[];
}
