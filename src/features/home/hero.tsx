"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative min-h-187.75 flex flex-col items-center justify-center text-center px-margin-mobile bg-surface-container-low overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/background.png"
                    alt="Sustainable Packaging Hero"
                    className="w-full h-full object-cover pointer-events-none select-none"
                    loading="eager"
                    fill />
            </div>
            <div className="relative z-10 max-w-4xl space-y-md">
                <span className="inline-block px-md py-xs bg-secondary-container text-on-secondary-container rounded-full font-label-sm tracking-wider uppercase">
                    Material Honesty
                </span>
                <h2 className="font-headline-xl text-headline-xl text-primary leading-tight">
                    Packaging that respects <br className="hidden md:block" /> the planet's pace.
                </h2>
                <div className="pt-base flex flex-col md:flex-row items-center justify-center gap-md">
                    <Button
                        className="w-full md:w-auto px-xl py-md bg-primary text-on-primary font-label-md rounded-lg active:scale-95 transition-all hover:bg-primary-container"
                        asChild>
                        <Link href="/products">Shop collection</Link>
                    </Button>

                    <Button
                        className="bg-surface-bright w-full md:w-auto px-xl py-md text-primary font-label-md rounded-lg active:scale-95 transition-all hover:bg-surface-container"
                        asChild>
                        <Link href="/about-us">Our materials</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}