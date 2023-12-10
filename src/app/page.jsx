import { Suspense } from "react";

import ProductCard from "@/app/components/productCard";
import { fetchGET } from "@/utils/fetchGET";
import LoadingProduct from "./components/loadingProduct";

export default async function page() {
  const products = await fetchGET("/product", { component: "server" });
  return (
    <>
      <Suspense fallback={<LoadingProduct />}>
        <ProductCard products={products.payload} />
      </Suspense>
    </>
  );
}
