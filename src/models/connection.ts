import { Sequelize } from "sequelize-typescript";
import Product from "./product.model";
import Category from "./category.model";

const sequelize = new Sequelize({
    database: "crud_node", 
    username: "root",
    password: "myrootsql",
    dialect: "mysql",
    host: "10.7.0.3",
    logging: console.log,
    models: [Category, Product],
});

export default sequelize; 