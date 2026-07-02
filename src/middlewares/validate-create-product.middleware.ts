import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app-error';
import { Errors } from '../errors/errorMessages';

export function validateCreateProductMiddleware (
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const { name, category, price, description } = req.body;

    if (name === undefined) {
        throw new AppError(
            Errors.REQUIRED_PRODUCT_NAME.message,
            Errors.REQUIRED_PRODUCT_NAME.statusCode
        );
    }

    if (price === undefined) {
        throw new AppError(
            Errors.REQUIRED_PRODUCT_PRICE.message,
            Errors.REQUIRED_PRODUCT_PRICE.statusCode
        );
    }

    if (description === undefined) {
        throw new AppError(
            Errors.REQUIRED_PRODUCT_DESCRIPTION.message,
            Errors.REQUIRED_PRODUCT_DESCRIPTION.statusCode
        );
    }

    if (category === undefined) {
        throw new AppError(
            Errors.REQUIRED_PRODUCT_CATEGORY.message,
            Errors.REQUIRED_PRODUCT_CATEGORY.statusCode
        );
    }

    if ( typeof name !== 'string') {
        throw new AppError(
            Errors.INVALID_PRODUCT_NAME_TYPE.message,
            Errors.INVALID_PRODUCT_NAME_TYPE.statusCode
        );
    }

    if ( typeof price !== 'number') {
        throw new AppError(
            Errors.INVALID_PRODUCT_PRICE_TYPE.message,
            Errors.INVALID_PRODUCT_PRICE_TYPE.statusCode
        );
    }
    
    if ( typeof category !== 'string') {
        throw new AppError(
            Errors.INVALID_PRODUCT_CATEGORY_TYPE.message,
            Errors.INVALID_PRODUCT_CATEGORY_TYPE.statusCode
        );
    }

    if ( typeof description !== 'string' || description.trim() === '' ) {
        throw new AppError(
            Errors.INVALID_PRODUCT_DESCRIPTION_TYPE.message,
            Errors.INVALID_PRODUCT_DESCRIPTION_TYPE.statusCode
        );
    }

    next();// tudo certo para prosseguir para o próximo middleware ou rota

}