import path from "path";
import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import Api from "./routes/home";
import connectDb from "./models";

const app = express();
const port = 3005; 

app.use(express.json());

connectDb().then(() => { 
    console.log('Conectado ao banco de dados');   
})

app.use('/', Api); 

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});