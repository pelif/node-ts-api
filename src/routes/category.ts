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

export default router;