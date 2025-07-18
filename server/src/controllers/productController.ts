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
    const product = await prisma.products.create({
      data: {
        name,
        price,
        rating,
        stockQuantity,
      },
    });
    await prisma.notification.create({
      data: {
        message: `New product created: ${name}`,
        type: "product",
        entityId: product.productId,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    next(handlePrismaError(error));
  }
};
