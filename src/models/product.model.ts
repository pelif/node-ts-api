import { Optional } from "sequelize";
import {
    AllowNull,
    Column, 
    Model, 
    PrimaryKey, 
    Table
} from "sequelize-typescript";

interface ProductAttributes {
    id: string;
    name: string;
    price: number;
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
}   