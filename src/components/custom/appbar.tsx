"use client";

import Link from "next/link";

export function AppBar() {
    return (
        <header className="w-full top-0 sticky bg-background z-40 border-b border-outline-variant/30">
            <div className="flex justify-between items-center h-20 px-xl max-w-container-max mx-auto">
                <Link className="font-headline-lg text-headline-lg text-primary tracking-tight" href={"/"}>SuvaPack</Link>
                <nav className="hidden md:flex items-center space-x-lg">
                    <Link
                        className="text-primary font-bold border-b-2 border-primary pb-1 font-label-md text-label-md"
                        href={"/products"}>
                        Shop all
                    </Link>
                    <Link
                        className="text-primary font-bold border-b-2 border-primary pb-1 font-label-md text-label-md"
                        href={"/about-us"}>
                        About us
                    </Link>
                    <Link
                        className="text-primary font-bold border-b-2 border-primary pb-1 font-label-md text-label-md"
                        href={"/contact"}>
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}
