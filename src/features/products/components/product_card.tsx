import Link from "next/link";
import { Product } from "../types";
import Image from "next/image";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group cursor-pointer block">
      <div className="relative aspect-4/5 bg-surface rounded-lg mb-md overflow-hidden transition-all duration-500 hover:shadow-lg">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover grayscale-30 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
          fill loading="eager" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-md left-md">
          <span className="px-sm py-xs bg-primary text-on-primary text-label-sm rounded">
            {product.rating >= 4.5 ? "Top Rated" : "Premium"}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-body-lg font-bold text-primary">{product.name}</h4>
        </div>
        <span className="font-body-lg text-primary">{product.price.toLocaleString()} VND</span>
      </div>
    </Link>
  );
}
