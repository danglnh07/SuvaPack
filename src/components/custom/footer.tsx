import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full mt-xl bg-surface-container border-t border-secondary/20 flex flex-col items-center gap-sm p-lg text-center">
      <h2 className="font-headline-sm text-headline-sm text-primary mb-base">SavaPack</h2>
      <nav className="flex flex-wrap justify-center gap-md mb-md">
        <Link
          className="font-label-sm text-on-secondary-fixed-variant hover:text-primary transition-colors"
          href={"/"} >
          Privacy policy
        </Link>
        <Link
          className="font-label-sm text-on-secondary-fixed-variant hover:text-primary transition-colors"
          href={"/"} >
          Terms of services
        </Link>
        <Link
          className="font-label-sm text-on-secondary-fixed-variant hover:text-primary transition-colors"
          href={"/contact"} >
          Contact us
        </Link>
      </nav>
      <p className="font-label-sm text-on-secondary-fixed-variant opacity-80">&copy; {year} SavaPack. Material Honesty.</p>
    </footer>
  );
}
