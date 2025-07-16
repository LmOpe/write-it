import { Request, Response, NextFunction } from 'express';
import { ZodType } from "zod";

type ValidationSchemas = {
  body?: ZodType<any, any>;
  params?: ZodType<any, any>;
  query?: ZodType<any, any>;
};

export const validateRequest = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }

      if (schemas.query) {
        const parsedQuery = schemas.query.parse(req.query);
        Object.assign(req.query, parsedQuery);
      }

      next();
    } catch (err: any) {
      const error = err?.issues?.[0]
      console.log(err)
      const message =
        `${error?.message} for ${error?.path[0]}` || "Invalid request";
      return res.status(400).json({ message });
    }
  }
};
