import { Optional } from "sequelize";
import {
    AllowNull,
    BelongsTo,
    Column, 
    ForeignKey, 
    Model, 
    PrimaryKey, 
    Table
} from "sequelize-typescript";
import Category from "./category.model";

export interface ProductAttributes {
    id: string;
    name: string;
    price: number;
    categoryId: string;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

@Table({
    tableName: "products",
    timestamps: false
}) 
export default class Product extends Model<ProductAttributes, ProductCreationAttributes> {
    @PrimaryKey
    @Column    
    declare id: string;

    @Column
    declare name: string;

    @Column
    declare price: number;

    @ForeignKey(() => Category)
    @Column
    declare categoryId: string;

    // @BelongsTo(() => Category)
    // declare category: Category;
}   