import { z } from "zod";

export const createProductValidationSchema = z.object({
  productName: z.string({ required_error: "Product Name is required" }),
  productType: z.string({ required_error: "Product Type is required" }),
  productCategory: z.array(
    z.string({ required_error: "Product Category is required" })
  ),
});
