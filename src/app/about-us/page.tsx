import Image from "next/image";

export default function AboutUs() {
    return (
        <>
            <section className="py-xl px-xl max-w-container-max mx-auto">
                <div className="grid grid-cols-12 gap-gutter items-center">
                    <div className="col-span-12 md:col-span-8">
                        <h1 className="font-headline-xl text-headline-xl text-primary mb-md">Material Honesty for a Conscious Future</h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                            We believe that the most beautiful products are those that leave the smallest footprint. KraftPack is born from the intersection of artisanal craft and environmental responsibility.
                        </p>
                    </div>
                </div>
            </section>
            <section className="py-xl px-xl max-w-container-max mx-auto">
                <div className="grid grid-cols-12 gap-gutter items-center">
                    <div className="col-span-12 md:col-span-5 order-2 md:order-1">
                        <Image
                            src="/about-us.png" alt="about us image" width={40} height={50} loading="eager"
                            className="w-full aspect-4/5 object-cover rounded-lg shadow-sm"
                        />
                    </div>
                    <div className="col-span-12 md:col-span-6 md:col-start-7 order-1 md:order-2 mb-lg md:mb-0">
                        <span className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-base block">Established 2018</span>
                        <h2 className="font-headline-lg text-headline-lg text-primary mb-md">Our Story</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant mb-md leading-relaxed">
                            What started in a small workshop in the Pacific Northwest has evolved into a global standard for sustainable packaging. Our founder, a master papermaker, saw the disconnect between luxury retail and environmental ethics.
                        </p>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                            KraftPack was founded to bridge that gap. We utilize post-consumer waste and FSC-certified fibers to create packaging that feels as good as it looks. Every fold, every fiber, and every finish is intentional.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}