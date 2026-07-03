"use client";

import { ExploreProductListingDto } from "@/shared/client";
import { Button } from "@/shared/components/primitives/button";
import { Card, CardContent } from "@/shared/components/primitives/card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/shared/components/primitives/hover-card";
import { cn } from "@/shared/lib/utils";
import { IconMapPin, IconShoppingCart } from "@tabler/icons-react";
import * as React from "react";
import { useState } from "react";
import { calculateDistance, formatDistance } from "../utils/distance";
import { RatingStars } from "./rating-stars";

type ProductCardProps = {
    product: ExploreProductListingDto;
    userLat: number;
    userLon: number;
};

const StockBadge = ({ stock }: { stock: number }) => {
    if (stock === 0)
        return (
            <span className="text-[0.7rem] font-semibold text-destructive">
                Out of Stock
            </span>
        );
    if (stock < 5)
        return (
            <span className="text-[0.7rem] font-semibold text-destructive">
                Only {stock} left – order soon
            </span>
        );
    if (stock < 20)
        return (
            <span className="text-[0.7rem] font-semibold text-amber-600 dark:text-amber-400">
                Only {stock} left
            </span>
        );
    return (
        <span className="text-[0.7rem] font-semibold text-green-700 dark:text-green-400">
            In Stock
        </span>
    );
};

export const ProductCard = ({
    product,
    userLat,
    userLon,
}: ProductCardProps) => {
    const [addedToCart, setAddedToCart] = useState(false);

    const city = product.business.address?.city;
    const inStock = (product.product.stock ?? 1) > 0;

    const distanceKm = calculateDistance(
        {
            lat: userLat,
            lon: userLon,
        },
        {
            lat: product.business.address.latitude,
            lon: product.business.address.longitude,
        },
    );

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!inStock) return;
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <HoverCard>
            <HoverCardTrigger
                delay={400}
                closeDelay={100}
                render={<div className="group" />}
            >
                <Card className="overflow-hidden border flex flex-col gap-0 py-0 shadow-none rounded-2xl transition-all duration-200 group-hover:shadow-xl group-hover:ring-1 group-hover:ring-foreground/10 group-hover:-translate-y-0.5">
                    <div className="relative w-full aspect-square bg-muted flex items-center justify-center text-7xl overflow-hidden">
                        {product.logo ?
                            <img
                                src={product.logo}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        :   <span className="select-none">📦</span>}
                        {product.product.stock != null &&
                            product.product.stock < 5 &&
                            product.product.stock > 0 && (
                                <div className="absolute top-2.5 left-2.5 bg-destructive text-destructive-foreground text-[0.6rem] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md">
                                    Low Stock
                                </div>
                            )}
                        {product.product.stock === 0 && (
                            <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
                                <span className="bg-background border border-border text-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                                    Out of Stock
                                </span>
                            </div>
                        )}
                    </div>
                    <CardContent className="flex flex-1 flex-col px-3.5 py-3 min-w-0 gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center text-[0.5rem] font-bold text-white bg-foreground shrink-0">
                                {product.business.title.charAt(0)}
                            </div>
                            <span className="text-[0.7rem] text-muted-foreground truncate font-medium">
                                {product.business.title}
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
                            {product.title}
                        </span>
                        <RatingStars />
                        <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="text-[0.65rem] font-medium text-foreground -mb-0.5">
                                ₹
                            </span>
                            <span className="text-xl font-bold leading-none tracking-tight text-foreground">
                                {product.product.price.toLocaleString("en-IN")}
                            </span>
                        </div>
                        <StockBadge stock={product.product.stock} />
                        <Button
                            className={cn(
                                "gap-2 shrink-0 mt-1 w-full transition-all duration-150",
                                addedToCart &&
                                    "bg-green-600 hover:bg-green-600",
                            )}
                            disabled={!inStock}
                            onClick={handleAddToCart}
                        >
                            <IconShoppingCart className="w-3.5 h-3.5" />
                            {addedToCart ? "Added!" : "Add to Cart"}
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
                    {product.title}
                </p>
                {product.description && (
                    <p className="text-[0.7rem] text-muted-foreground leading-relaxed line-clamp-4">
                        {product.description}
                    </p>
                )}
                <div className="border-t pt-3 flex flex-col gap-2">
                    <div className="flex justify-between text-[0.7rem]">
                        <span className="text-muted-foreground">Sold by</span>
                        <span className="font-medium text-foreground truncate max-w-[60%] text-right">
                            {product.business.title}
                        </span>
                    </div>
                    {product.business.address?.city && (
                        <div className="flex justify-between text-[0.7rem]">
                            <span className="text-muted-foreground">
                                Ships from
                            </span>
                            <span className="font-medium text-foreground">
                                {product.business.address.city},{" "}
                                {product.business.address.state}
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
                        <span className="text-muted-foreground">Stock</span>
                        <StockBadge stock={product.product.stock} />
                    </div>
                    <div className="flex justify-between text-[0.7rem]">
                        <span className="text-muted-foreground">Rating</span>
                        <RatingStars />
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};
