import path from "path";
import express from "express";
import bodyParser from "body-parser";
import ProductEndpoints from "./routes/product";
import CategoryEndpoints from "./routes/category";
import connectDb from "./models";

const app = express();
const port = 3005; 



app.use(express.json());

connectDb().then(() => { 
    console.log('Conectado ao banco de dados');   
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/products', ProductEndpoints); 
app.use('/categories', CategoryEndpoints); 

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});