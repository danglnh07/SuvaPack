"use client";

import { useRouter } from "next/navigation";
import { ProductCard } from "../products/components/product_card";
import { useProducts } from "../products/queries";

export function ProductPreview() {
  const router = useRouter();
  const { data: products, isLoading } = useProducts({ page: 0, size: 3 });

  return (
    <section className="py-xl bg-surface-container-low overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="text-center mb-xl">
          <h3 className="font-headline-lg text-headline-lg text-primary">The Essentials Collection</h3>
          <p className="font-body-md text-on-surface-variant">Curated solutions for the modern minimalist shop.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-4/5 bg-surface-container-high rounded-lg mb-md" />
                  <div className="h-5 bg-surface-container-high rounded w-3/4 mb-2" />
                  <div className="h-4 bg-surface-container-high rounded w-1/2" />
                </div>
              ))
            : products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
        <div className="mt-xl text-center">
          <button
            className="px-lg py-md border border-primary text-primary font-label-md rounded-lg hover:bg-primary hover:text-on-primary transition-all active:scale-95"
            onClick={() => router.push("/products")}
          >
            Discover Entire Range
          </button>
        </div>
      </div>
    </section>
  );
}
