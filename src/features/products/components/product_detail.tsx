import { Star } from "lucide-react";
import { Product } from "../types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ProductDetail({ product }: { product: Product }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl mb-xl">
            <div className="lg:col-span-7 flex flex-col gap-base">
                <div className="bg-surface-container-low overflow-hidden rounded-lg relative aspect-4/5 md:aspect-square">
                    <img
                        alt={product.name}
                        className="w-full h-full object-cover"
                        src={product.image}
                    />
                </div>
            </div>
            <div className="lg:col-span-5 flex flex-col pt-base">
                <div className="mb-md">
                    <p className="font-label-md text-label-md text-secondary tracking-widest uppercase mb-xs">
                        Sustainable Essentials
                    </p>
                    <h1 className="font-headline-xl text-headline-xl text-primary mb-xs">{product.name}</h1>
                    <div className="flex items-center gap-1">
                        <Star fill="currentColor" size={16} className="text-amber-500" />
                        <span className="font-label-md text-label-md text-primary">
                            {product.rating.toFixed(1)}
                        </span>
                    </div>
                </div>
                <div className="mb-lg">
                    <p className="font-headline-lg text-headline-lg text-primary">
                        {product.price.toLocaleString()} VND
                    </p>
                </div>

                <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
                    {product.description}
                </p>

                <div className="flex flex-col gap-md">
                    <Button
                        className="w-full border border-primary text-primary h-15 rounded flex items-center justify-center font-label-md text-label-md hover:bg-primary/5 transition-colors"
                        variant="outline"
                        asChild>
                        <Link href="https://facebook.com" target="_blank">Request Custom Branding Sample</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
