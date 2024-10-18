import express, { Request, Response } from "express";
import Category from "../models/category.model";
import CategoryRepository from "../repositories/category.repository";

const router = express.Router();
const categoryRepository = new CategoryRepository();

router.get("/", async (req: Request, res: Response) => {
    try {
        const categories = await categoryRepository.findAll();
        res.status(200).json({ categories: categories });
    } catch(error: unknown) {
        if (error instanceof Error) {            
            res.status(500).json({ 
              error: error.message,
              message: "Erro ao buscar as categorias!" 
            });
        } else {            
            res.status(500).json({ 
              error: "Erro desconhecido",
              message: "Erro ao buscar as categorias!" 
            });
        }
    }
    
});


router.post("/", async (req: Request, res: Response) => {
    try {
        const { id, name } = req.body;
        const category = await categoryRepository.create({ id, name } as Category);
        res.status(201).json({ category });
    } catch(error: unknown) {
        if (error instanceof Error) {            
            res.status(500).json({ 
              error: error.message,
              message: "Erro ao criar a categoria!" 
            });
        } else {
            console.log("Erro desconhecido");
            res.status(500).json({ 
              error: "Erro desconhecido",
              message: "Erro ao criar a categoria!" 
            });
        }
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await categoryRepository.update(id, { name } as Category);

        if(!category) { 
            res.status(404).json({ 
                error: "Categoria não encontrada",
                message: "Erro ao atualizar a categoria!" 
            });
        } else {
            const categoryUpdated = await categoryRepository.findById(id);
            res.status(200)
               .json({ 
                    category: categoryUpdated, 
                    message: "Categoria alterada com sucesso!"            
                });
        }       

    } catch(error: unknown) {
        if (error instanceof Error) {            
            res.status(500).json({ 
              error: error.message,
              message: "Erro ao atualizar a categoria!" 
            });
        } else {
            console.log("Erro desconhecido");
            res.status(500).json({ 
              error: "Erro desconhecido",
              message: "Erro ao atualizar a categoria!" 
            });
        }
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await categoryRepository.findById(id);

        if(!category) {
            res.status(404).json({ 
                error: "Categoria não encontrada",
                message: "Erro ao buscar a categoria!" 
            });
        } else {
            res.status(200)
               .json({ 
                    category: category,
                    message: "Categoria encontrada com sucesso!"
                });
        }
    } catch(error: unknown) {
        if (error instanceof Error) {            
            res.status(500).json({ 
              error: error.message,
              message: "Erro ao buscar a categoria!" 
            });
        } else {
            console.log("Erro desconhecido");
            res.status(500).json({ 
              error: "Erro desconhecido",
              message: "Erro ao buscar a categoria!" 
            });
        }
    }
}); 

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const categoryDeleted = await categoryRepository.findById(id);
        const category = await categoryRepository.delete(id);

        if(!category) {
            res.status(404).json({ 
                error: "Categoria não encontrada",
                message: "Erro ao excluir a categoria!" 
            });
        } else {
            res.status(200)
               .json({ 
                    category: categoryDeleted,
                    message: "Categoria excluída com sucesso!"
                });
        }
    } catch(error: unknown) {
        if (error instanceof Error) {            
            res.status(500).json({ 
              error: error.message,
              message: "Erro ao excluir a categoria!" 
            });
        } else {
            console.log("Erro desconhecido");
            res.status(500).json({ 
              error: "Erro desconhecido",
              message: "Erro ao excluir a categoria!" 
            });
        }
    }
});

export default router;