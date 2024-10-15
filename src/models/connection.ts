import { Sequelize } from "sequelize-typescript";
import Product from "./product.model";

const sequelize = new Sequelize({
    database: "crud_node", 
    username: "root",
    password: "myrootsql",
    dialect: "mysql",
    host: "10.7.0.3",
    models: [Product],
});

export default sequelize; 