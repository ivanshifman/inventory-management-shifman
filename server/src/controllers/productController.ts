import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import { handlePrismaError } from "../utils/handlePrismaError";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
    res.json(products);
  } catch (error) {
    next(handlePrismaError(error));
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, price, rating, stockQuantity } = req.body;
    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.products.create({
        data: {
          name,
          price,
          rating,
          stockQuantity,
        },
      });

      await tx.notification.create({
        data: {
          message: `New product created: ${name}`,
          type: "product",
          entityId: product.productId,
        },
      });

      return product;
    });

    res.status(201).json(result);
  } catch (error) {
    next(handlePrismaError(error));
  }
};
