import express, {Request, Response} from "express";
import Product, { ProductAttributes } from "../models/product.model";
import Category from "../models/category.model";

const router = express.Router();


router.get("/", async (req: Request, res: Response) => {

    try {       
        const products = await Product.findAll();
        res.json({products: products});
    } catch(error: unknown) {
        if (error instanceof Error) {            
            res.status(500).json({ 
              error: error.message,
              message: "Erro ao listar os produtos!" 
            });
        } else {
            console.log("Erro desconhecido");
            res.status(500).json({ 
              error: "Erro desconhecido",
              message: "Erro ao tentar listar os produtos!" 
            });
        }
    }
  
});

router.get("/:id", async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const product = await Product.findOne({ where: { id } });

        if(!product) {
            res.status(404).json({ 
                error: "Produto não encontrado",
                message: "Erro ao buscar o produto!" 
            });
        } else {
            res.status(200)
               .json({ 
                    product: product,
                    message: "Produto encontrado com sucesso!"
                });
        }
        
    } catch(error: unknown) {
        if (error instanceof Error) {            
            res.status(500).json({ 
              error: error.message,
              message: "Erro ao buscar o produto!" 
            });
        } else {
            console.log("Erro desconhecido");
            res.status(500).json({
              error: "Erro desconhecido",
              message: "Erro ao buscar o produto!"
            });
        }        
    } 

});

router.post("/", async (req: Request, res: Response) => {
      
    try {

        const { id, name, price, categoryId } = req.body;
        console.log(req.body);
        const product = await Product.create({ id, name, price, categoryId } as ProductAttributes);
        res.status(201)
           .json({ 
            product: product,
            message: "Produto criado com sucesso!"
         });

    } catch(error: unknown) {
        if (error instanceof Error) {            
            res.status(500).json({ 
              error: error.message,
              stack: error.stack,              
              message: "Erro ao criar o produto!" 
            });
        } else {
            console.log("Erro desconhecido");
            res.status(500).json({ 
              error: "Erro desconhecido",
              message: "Erro ao criar o produto!" 
            });
        }
      }
});

router.put("/", async (req: Request, res: Response) => {
    try {
        const { id, name, price, categoryId } = req.body;
        const product = await Product.update({ name, price, categoryId }, { where: { id } });

        res.status(200)
           .json({ 
            product: product,
            message: "Produto atualizado com sucesso!"
         });

    } catch(error: unknown) {
        if (error instanceof Error) {            
            res.status(500).json({ 
              error: error.message,
              message: "Erro ao atualizar o produto!" 
            });
        } else {
            console.log("Erro desconhecido");
            res.status(500).json({
              error: "Erro desconhecido",
              message: "Erro ao atualizar o produto!"
            });
        }
    }

}); 

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.destroy({ where: { id } });

        if(!product) {
            res.status(404).json({ 
                error: "Produto não encontrado",
                message: "Erro ao excluir o produto!" 
            });
        } else {
            res.status(200)
               .json({ 
                    product: product,
                    message: "Produto excluído com sucesso!"
                });
        }

    } catch(error: unknown) {
        if (error instanceof Error) {            
            res.status(500).json({ 
              error: error.message,
              message: "Erro ao excluir o produto!" 
            });
        } else {
            console.log("Erro desconhecido");
            res.status(500).json({ 
              error: "Erro desconhecido",
              message: "Erro ao excluir o produto!" 
            });
        }
    }

});

export default router;