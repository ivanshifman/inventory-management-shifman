import { Router } from "express";
import { createProduct, getProducts } from "../controllers/productController";
import { validate } from "../middlewares/validate";
import { createProductSchema, getProductsQuerySchema } from "../schemas/productSchema";

const router = Router();

router.get("/", validate(getProductsQuerySchema), getProducts);
router.post("/", validate(createProductSchema), createProduct);

export default router;
