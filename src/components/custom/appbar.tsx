"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/products", label: "Shop all" },
    { href: "/about-us", label: "About us" },
    { href: "/contact", label: "Contact" },
];

export function AppBar() {
    const pathname = usePathname();

    return (
        <header className="w-full top-0 sticky z-40 shadow-lg bg-linear-to-r from-green-950 via-emerald-900 to-green-900">
            <div className="flex justify-between items-center h-20 px-xl max-w-container-max mx-auto">
                <Link href={"/"} className="relative h-10 w-40 shrink-0 brightness-0 invert">
                    <Image
                        src="/logo.png"
                        alt="savapack-logo"
                        fill
                        className="object-contain object-left pointer-events-none select-none"
                        sizes="160px"
                    />
                </Link>
                <nav className="hidden md:flex items-center space-x-lg">
                    {links.map(({ href, label }) => {
                        const isActive = pathname === href || pathname.startsWith(href + "/");
                        return (
                            <Link
                                key={href}
                                className={`font-bold pb-1 font-label-md text-label-md transition-all ${isActive
                                        ? "text-on-primary border-b-2 border-on-primary"
                                        : "text-on-primary/60 hover:text-on-primary border-b-2 border-transparent"
                                    }`}
                                href={href}>
                                {label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
