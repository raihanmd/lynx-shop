import { getProductByCategory } from "@/database/categories/getProductByCategory";
import { myResponse } from "@/utils/myResponse";

export async function GET(req, { params }) {
  try {
    const { category } = params;
    const products = await getProductByCategory(category);
    return myResponse(200, products, "Data successfully retrieved.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
