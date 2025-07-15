import { Request, Response, NextFunction } from 'express';
import { ZodObject } from "zod";

export const validateRequest = (schema: ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (err: any) {
        const error = err?.issues?.[0]
      const message =
        `${error?.message} for ${error?.path[0]}` || "Invalid request";
      return res.status(400).json({ message });
    }
  };
};
