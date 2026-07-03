"use client";

import { buttonVariants } from "@/shared/components/primitives/button";
import { cn } from "@/shared/lib/utils";
import {
    IconChevronLeft,
    IconChevronRight,
    IconDots,
    ReactNode,
} from "@tabler/icons-react";

// TODO: WTF IS THIS?? i need to remove this and impl something better
const getPageItems = (
    current: number,
    total: number,
): (number | "ellipsis")[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const items: (number | "ellipsis")[] = [1];
    if (current > 3) items.push("ellipsis");
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) items.push(i);
    if (current < total - 2) items.push("ellipsis");
    items.push(total);
    return items;
};

type PaginationProps = {
    page: number;
    totalPages: number;
    onPageChange: (p: number) => void;
};

const Pagination = ({
    page,
    totalPages,
    onPageChange,
}: PaginationProps): ReactNode => (
    <nav
        role="navigation"
        aria-label="pagination"
        className="mx-auto flex w-full justify-center"
    >
        <ul className="flex flex-row items-center gap-1">
            <li>
                <button
                    aria-label="Go to previous page"
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                    className={cn(
                        buttonVariants({ variant: "ghost", size: "default" }),
                        "gap-1 px-2.5 sm:pl-2.5",
                        page === 1 && "pointer-events-none opacity-50",
                    )}
                >
                    <IconChevronLeft className="size-4" />
                    <span className="hidden sm:block">Previous</span>
                </button>
            </li>
            {getPageItems(page, totalPages).map((item, i) => (
                <li key={item === "ellipsis" ? `ellipsis-${i}` : item}>
                    {item === "ellipsis" ?
                        <span
                            aria-hidden
                            className="flex size-9 items-center justify-center"
                        >
                            <IconDots className="size-4" />
                            <span className="sr-only">More pages</span>
                        </span>
                    :   <button
                            aria-current={page === item ? "page" : undefined}
                            onClick={() => onPageChange(item)}
                            className={cn(
                                buttonVariants({
                                    variant:
                                        page === item ? "outline" : "ghost",
                                    size: "icon",
                                }),
                                "size-9",
                            )}
                        >
                            {item}
                        </button>
                    }
                </li>
            ))}
            <li>
                <button
                    aria-label="Go to next page"
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className={cn(
                        buttonVariants({ variant: "ghost", size: "default" }),
                        "gap-1 px-2.5 sm:pr-2.5",
                        page === totalPages && "pointer-events-none opacity-50",
                    )}
                >
                    <span className="hidden sm:block">Next</span>
                    <IconChevronRight className="size-4" />
                </button>
            </li>
        </ul>
    </nav>
);

export { Pagination };
