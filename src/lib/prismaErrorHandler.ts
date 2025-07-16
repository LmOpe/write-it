import { Prisma } from '../../generated/prisma';
import { ApiError } from "./errors";

export function handlePrismaError(error: any): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": {
        const fields = (error.meta?.target as string[])?.join(", ") || "field(s)";
        throw new ApiError(`${fields} already exist`, 409);
      }

      case "P2003": {
        const field = (error.meta?.field_name as string) || "related field";
        throw new ApiError(`Foreign key constraint failed on ${field}`, 400);
      }

      case "P2025":
        const model = error?.meta?.modelName || "resource";
        const message = `${model}: ${error.meta?.cause}` || "Requested resource not found";
        throw new ApiError(message, 404);

      default:
        throw new ApiError(`Database error [${error.code}]`, 500);
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new ApiError("Invalid input data", 400);
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new ApiError("Database initialization failed", 500);
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    throw new ApiError("Prisma engine crashed", 500);
  }
  throw error;
}
