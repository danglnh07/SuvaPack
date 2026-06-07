import { Facebook } from "@hugeicons/core-free-icons";
import { LocationEdit, Mail, MessageCircleCode, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
    return (
        <section className="py-xl px-xl max-w-container-max mx-auto" id="contact">
            <div className="grid grid-cols-12 gap-lg">
                <div className="col-span-12 md:col-span-7">
                    <h2 className="font-headline-lg text-headline-lg text-primary mb-lg">Get in Touch</h2>
                    <Image
                        src="/contact.png" alt="contact" width={400} height={60} loading="eager"
                        className="w-full aspect-4/5 object-cover rounded-lg shadow-sm" />
                </div>
                <div className="col-span-12 md:col-span-5 space-y-lg">
                    <div className="bg-surface-container-low p-lg rounded-xl border border-outline-variant/20">
                        <h3 className="font-headline-md text-headline-md text-primary mb-md">Our Studio</h3>
                        <div className="space-y-md">
                            <div className="flex gap-md">
                                <span className="material-symbols-outlined text-secondary" data-icon="location_on">
                                    <LocationEdit />
                                </span>
                                <p className="font-body-md text-body-md text-on-surface-variant">
                                    842 Eco-Industrial Way<br />Portland, OR 97201<br />United States
                                </p>
                            </div>
                            <div className="flex gap-md">
                                <span className="material-symbols-outlined text-secondary" data-icon="mail">
                                    <Mail />
                                </span>
                                <p className="font-body-md text-body-md text-on-surface-variant">hello@kraftpack.eco</p>
                            </div>
                            <div className="flex gap-md">
                                <span className="material-symbols-outlined text-secondary" data-icon="call">
                                    <Phone />
                                </span>
                                <p className="font-body-md text-body-md text-on-surface-variant">+1 (503) 555-0128</p>
                            </div>
                            <div className="flex gap-md">
                                <span className="material-symbols-outlined text-secondary" data-icon="call">
                                    <MessageCircleCode />
                                </span>
                                <p className="font-body-md text-body-md text-on-surface-variant">
                                    <Link href="https://facebook.com" target="_blank">Our fanpage</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-outline-variant/20 grayscale h-60">
                        <Image src="/map.png" alt="map" fill loading="eager" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
}