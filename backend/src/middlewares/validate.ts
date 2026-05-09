import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { HttpStatusCode } from '../enums/StatusCode';

export function validateBody<T extends object>(DtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(DtoClass, req.body);
    const errors = await validate(instance);

    if (errors.length > 0) {
      const messages = errors.flatMap((e) => Object.values(e.constraints ?? {}));
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: messages.join(', '),
      });
      return;
    }

    req.body = instance;
    next();
  };
}