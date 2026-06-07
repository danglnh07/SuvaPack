"use client";

import { HeroSection } from "@/features/home/hero";
import { ProductPreview } from "@/features/home/product_preview";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products Preview */}
      <ProductPreview />
    </main>
  );
}
