"use client";

import { ExploreServiceListingDto } from "@/shared/client";
import { Button } from "@/shared/components/primitives/button";
import { Card, CardContent } from "@/shared/components/primitives/card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/shared/components/primitives/hover-card";
import { cn } from "@/shared/lib/utils";
import { IconCalendarCheck, IconMapPin } from "@tabler/icons-react";
import { calculateDistance, formatDistance } from "../utils/distance";
import { RatingStars } from "./rating-stars";

type ServiceCardProps = {
    service: ExploreServiceListingDto;
    userLat: number;
    userLon: number;
};

const parseServicePrice = (
    price: string,
): { hasRupee: boolean; num: number | null; suffix: string } => {
    const hasRupee = price.includes("₹");
    const numMatch = price.replace(/,/g, "").match(/[\d.]+/);
    const num = numMatch ? parseFloat(numMatch[0]) : null;
    const suffix = price
        .replace(/[₹\d,.]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    return { hasRupee, num, suffix };
};

const AvailabilityBadge = ({ available }: { available: boolean }) => (
    <span
        className={cn(
            "text-[0.7rem] font-semibold",
            available ?
                "text-green-700 dark:text-green-400"
            :   "text-destructive",
        )}
    >
        {available ? "Available" : "Unavailable"}
    </span>
);

export const ServiceCard = ({
    service,
    userLat,
    userLon,
}: ServiceCardProps) => {
    const city = service.business.address.city;
    const available = service.service.available;
    const parsedPrice = parseServicePrice(service.service.price);

    const distanceKm = calculateDistance(
        {
            lat: userLat,
            lon: userLon,
        },
        {
            lat: service.business.address.latitude,
            lon: service.business.address.longitude,
        },
    );

    return (
        <HoverCard>
            <HoverCardTrigger
                delay={400}
                closeDelay={100}
                render={<div className="group" />}
            >
                <Card className="overflow-hidden border flex flex-col gap-0 py-0 shadow-none rounded-2xl transition-all duration-200 group-hover:shadow-xl group-hover:ring-1 group-hover:ring-foreground/10 group-hover:-translate-y-0.5">
                    <div className="relative w-full aspect-square bg-muted flex items-center justify-center text-7xl overflow-hidden">
                        {service.logo ?
                            <img
                                src={service.logo}
                                alt={service.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        :   <span className="select-none">🛠️</span>}
                        {!available && (
                            <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
                                <span className="bg-background border border-border text-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                                    Unavailable
                                </span>
                            </div>
                        )}
                    </div>
                    <CardContent className="flex flex-1 flex-col px-3.5 py-3 min-w-0 gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center text-[0.5rem] font-bold text-white bg-foreground shrink-0">
                                {service.business.title.charAt(0)}
                            </div>
                            <span className="text-[0.7rem] text-muted-foreground truncate font-medium">
                                {service.business.title}
                            </span>
                            {distanceKm != null ?
                                <span className="ml-auto flex items-center gap-0.5 text-[0.65rem] text-muted-foreground shrink-0">
                                    <IconMapPin className="w-2.5 h-2.5" />
                                    {formatDistance(distanceKm)}
                                </span>
                            : city ?
                                <span className="ml-auto flex items-center gap-0.5 text-[0.65rem] text-muted-foreground shrink-0">
                                    <IconMapPin className="w-2.5 h-2.5" />
                                    {city}
                                </span>
                            :   null}
                        </div>
                        <span className="text-sm font-semibold leading-snug text-foreground line-clamp-2 hover:text-sky-600 transition-colors cursor-pointer">
                            {service.title}
                        </span>
                        <RatingStars />
                        <div className="flex items-baseline gap-1 mt-0.5">
                            {parsedPrice.hasRupee && parsedPrice.num !== null ?
                                <>
                                    <span className="text-[0.65rem] font-medium text-foreground -mb-0.5">
                                        ₹
                                    </span>
                                    <span className="text-xl font-bold leading-none tracking-tight text-foreground">
                                        {parsedPrice.num.toLocaleString(
                                            "en-IN",
                                        )}
                                    </span>
                                    {parsedPrice.suffix && (
                                        <span className="text-xs text-muted-foreground lowercase">
                                            {parsedPrice.suffix}
                                        </span>
                                    )}
                                </>
                            :   <span className="text-xl font-bold leading-none tracking-tight text-foreground">
                                    {service.service.price}
                                </span>
                            }
                        </div>
                        <AvailabilityBadge available={available} />
                        <Button
                            className={cn(
                                "gap-2 shrink-0 mt-1 w-full transition-all duration-150",
                            )}
                            disabled={!available}
                        >
                            <IconCalendarCheck className="w-3.5 h-3.5" />
                            Book Now
                        </Button>
                    </CardContent>
                </Card>
            </HoverCardTrigger>
            <HoverCardContent
                side="right"
                align="start"
                className="w-64 p-4 flex flex-col gap-3 rounded-xl shadow-2xl"
            >
                <p className="text-xs font-semibold text-foreground leading-snug">
                    {service.title}
                </p>
                {service.description && (
                    <p className="text-[0.7rem] text-muted-foreground leading-relaxed line-clamp-4">
                        {service.description}
                    </p>
                )}
                <div className="border-t pt-3 flex flex-col gap-2">
                    <div className="flex justify-between text-[0.7rem]">
                        <span className="text-muted-foreground">
                            Offered by
                        </span>
                        <span className="font-medium text-foreground truncate max-w-[60%] text-right">
                            {service.business.title}
                        </span>
                    </div>
                    {city && (
                        <div className="flex justify-between text-[0.7rem]">
                            <span className="text-muted-foreground">
                                Location
                            </span>
                            <span className="font-medium text-foreground">
                                {city}
                                {service.business.address?.state ?
                                    `, ${service.business.address.state}`
                                :   ""}
                            </span>
                        </div>
                    )}
                    {distanceKm != null && (
                        <div className="flex justify-between text-[0.7rem]">
                            <span className="text-muted-foreground">
                                Distance
                            </span>
                            <span className="font-medium text-foreground flex items-center gap-0.5">
                                <IconMapPin className="w-2.5 h-2.5 text-muted-foreground" />
                                {formatDistance(distanceKm)}
                            </span>
                        </div>
                    )}
                    <div className="flex justify-between text-[0.7rem]">
                        <span className="text-muted-foreground">
                            Availability
                        </span>
                        <AvailabilityBadge available={available} />
                    </div>
                    <div className="flex justify-between text-[0.7rem]">
                        <span className="text-muted-foreground">Rating</span>
                        <RatingStars />
                    </div>
                    <div className="flex justify-between text-[0.7rem]">
                        <span className="text-muted-foreground">Price</span>
                        <span className="font-medium text-foreground">
                            {service.service.price}
                        </span>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};
