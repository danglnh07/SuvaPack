"use client";

import { useState } from "react";
import { useProducts, useProductsCount } from "@/features/products/queries";
import { ProductCard } from "@/features/products/components/product_card";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 9;

export default function ProductPage() {
  const [page, setPage] = useState(0);

  const { data: products, isLoading } = useProducts({ page, size: PAGE_SIZE });
  const { data: totalCount = 0 } = useProductsCount();

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <section className="py-xl bg-surface-container-low min-h-screen">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="text-center mb-xl">
          <h3 className="font-headline-lg text-headline-lg text-primary">All Products</h3>
          <p className="font-body-md text-on-surface-variant">Curated solutions for the modern minimalist shop.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
          {isLoading
            ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
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

        {totalPages > 1 && (
          <div className="mt-xl flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={i === page ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(i)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
