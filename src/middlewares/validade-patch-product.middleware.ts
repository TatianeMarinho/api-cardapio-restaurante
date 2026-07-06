import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app-error';
import { Errors } from '../errors/errorMessages';


export function validatePatchProductMiddleware (
    req: Request,
    res: Response,
    next: NextFunction
): void {

    const allowedFields = [
        "name",
        "description",
        "available",
        "isFavorite",
        "availableForDelivery",
        "notes",
    ];

    const bodyFields = Object.keys(req.body);

    //verifica se veio pelo menos um campo no body
    const hasFieldsToUpdate = bodyFields.some((field) => 
        allowedFields.includes(field)
    );
    

    if (!hasFieldsToUpdate) {
        throw new AppError(
            Errors.NO_FIELDS_TO_UPDATE.message,
            Errors.NO_FIELDS_TO_UPDATE.statusCode,
        );
    }

    if (req.body.name !== undefined && !req.body.name.trim()){
        throw new AppError(
            Errors.REQUIRED_PRODUCT_NAME.message,
            Errors.REQUIRED_PRODUCT_NAME.statusCode,
        );
    }

    if (req.body.description !== undefined && !req.body.description.trim()) {
        throw new AppError(
            Errors.REQUIRED_PRODUCT_DESCRIPTION.message,
            Errors.REQUIRED_PRODUCT_DESCRIPTION.statusCode,
        );
    }

    next();
}