"use client";

import { IconStar, IconStarFilled } from "@tabler/icons-react";

export const MOCK_RATING = 4.2;
export const MOCK_REVIEW_COUNT = 128;

type RatingStarsProps = { rating?: number; count?: number };

const RatingStars = ({
    rating = MOCK_RATING,
    count = MOCK_REVIEW_COUNT,
}: RatingStarsProps) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;

    return (
        <div className="flex items-center gap-1">
            <div className="flex items-center text-amber-400">
                {Array.from({ length: 5 }, (_, i) =>
                    i < full ? <IconStarFilled key={i} className="w-3 h-3" />
                    : i === full && half ?
                        <div key={i} className="relative w-3 h-3">
                            <IconStar className="absolute inset-0 w-3 h-3 text-muted-foreground/30" />
                            <div className="absolute inset-0 overflow-hidden w-[50%]">
                                <IconStarFilled className="w-3 h-3" />
                            </div>
                        </div>
                    :   <IconStar
                            key={i}
                            className="w-3 h-3 text-muted-foreground/30"
                        />,
                )}
            </div>
            <span className="text-[0.7rem] text-sky-600 hover:underline cursor-pointer">
                {count.toLocaleString()}
            </span>
        </div>
    );
};

export { RatingStars };

