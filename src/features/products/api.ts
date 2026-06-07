import { supabase } from "@/lib/client";
import { Product } from "./types";

export async function getProducts({ page, size }: { page: number; size: number }) {
  const from = page * size;
  const to = from + size - 1;

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .range(from, to)
    .order("id");

  if (error) {
    console.error("Supabase fetch error:", error);
    return null;
  }

  return products as Product[];
}

export async function getProduct(id: string): Promise<Product | null> {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error("Supabase fetch error:", error);
    return null;
  }

  if (!products) {
    console.error("Product is null:", id);
    return null;
  }

  return products[0] as Product;
}

export async function getProductsCount(): Promise<number> {
  const { count, error } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Supabase count error:", error);
    return 0;
  }

  return count ?? 0;
}
