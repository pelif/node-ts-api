import express, {Request, Response} from "express";
import Product from "../models/product.model";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.json(["Hello, This is my first endpoint!"]);
});


router.get("/products", async (req: Request, res: Response) => {

    try {
        const products = await Product.findAll();
        res.json({products});
    } catch(error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
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

router.post("/product", async (req: Request, res: Response) => {
      
    try {

        const { id, name, price } = req.body;
        const product = await Product.create({ id, name, price });

        res.status(201)
           .json({ 
            product: product,
            message: "Produto criado com sucesso!"
         });

    } catch(error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(500).json({ 
              error: error.message,
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

router.put("/product", async (req: Request, res: Response) => {
    try {
        const { id, name, price } = req.body;
        const product = await Product.update({ name, price }, { where: { id } });

        res.status(200)
           .json({ 
            product: product,
            message: "Produto atualizado com sucesso!"
         });

    } catch(error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
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

router.delete("/product/:id", async (req: Request, res: Response) => {
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