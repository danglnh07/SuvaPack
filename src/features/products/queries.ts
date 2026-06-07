import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts, getProductsCount } from "./api";

export const productKeys = {
  all: ["products"] as const,
  list: (params: { page: number; size: number }) =>
    ["products", "list", params] as const,
  count: ["products", "count"] as const,
  detail: (id: string) => ["product", "detail", id] as const,
};

export function useProducts(params: { page: number; size: number }) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: async () => (await getProducts(params)) ?? [],
  });
}

export function useProductsCount() {
  return useQuery({
    queryKey: productKeys.count,
    queryFn: getProductsCount,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProduct(id),
  });
}
