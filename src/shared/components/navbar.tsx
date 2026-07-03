"use client";

import { ReactNode } from "react";
import NavbarSearch from "./navbar-search";
import { Avatar, AvatarFallback } from "./primitives/avatar";

const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
] as const;

const Navbar = ({
    latitude,
    longitude,
}: {
    latitude: number;
    longitude: number;
}): ReactNode => (
    <nav className="bg-background border-b border-border h-14 px-4 sm:px-8 flex items-center gap-4 sm:gap-8 sticky top-0 z-50 shrink-0">
        <a
            href="#"
            className="font-extrabold text-xl tracking-tight text-foreground no-underline shrink-0"
        >
            Theeka<span className="text-primary">.</span>
        </a>

        <NavbarSearch latitude={latitude} longitude={longitude} />

        <Avatar>
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    </nav>
);

export { Navbar };
