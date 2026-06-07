"use client";

import { useParams, useRouter } from "next/navigation";
import { useProduct } from "@/features/products/queries";
import { ProductDetail } from "@/features/products/components/product_detail";
import { Button } from "@/components/ui/button";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: product, isLoading, isError } = useProduct(id);

  if (isLoading) {
    return (
      <section className="py-xl px-margin-mobile md:px-gutter max-w-container-max mx-auto">
        <div className="animate-pulse grid grid-cols-1 lg:grid-cols-12 gap-xl mb-xl">
          <div className="lg:col-span-7">
            <div className="bg-surface-container-high rounded-lg aspect-4/5 md:aspect-square" />
          </div>
          <div className="lg:col-span-5 space-y-4 pt-base">
            <div className="h-4 bg-surface-container-high rounded w-1/4" />
            <div className="h-8 bg-surface-container-high rounded w-3/4" />
            <div className="h-6 bg-surface-container-high rounded w-1/3" />
            <div className="h-12 bg-surface-container-high rounded w-full mt-6" />
          </div>
        </div>
      </section>
    );
  }

  if (isError || !product) {
    return (
      <section className="py-xl px-margin-mobile md:px-gutter max-w-container-max mx-auto text-center">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-base">Product not found</h2>
        <p className="font-body-md text-on-surface-variant mb-lg">
          The product you are looking for does not exist or has been removed.
        </p>
        <Button variant="outline" onClick={() => router.push("/products")}>
          Back to Products
        </Button>
      </section>
    );
  }

  return (
    <section className="py-xl px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      <Button
        variant="ghost"
        size="sm"
        className="mb-lg"
        onClick={() => router.push("/products")}
      >
        &larr; Back to Products
      </Button>
      <ProductDetail product={product} />
    </section>
  );
}
