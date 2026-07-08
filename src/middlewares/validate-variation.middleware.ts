import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const validateVariationPayloadMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
        const forbiddenKeys = ["category", "subcategory", "description", "variations"];
        const body = req.body;

        if (body && typeof body === "object" && !Array.isArray(body)) {
            const containsForbiddenKey = forbiddenKeys.some(key => key in body);//procura se tem alguma chave proibida

            if(containsForbiddenKey) {
                throw new AppError(
                "Payload inválido para variação.Propriedades de Produto (category,subcategory, description, variations) não são permitidas. Para variações, envie apenas campos de variação.",
                400,
                );
            }
        }

        next();
    }