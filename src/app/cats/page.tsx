"use client";

import { Input } from "@/shared/components/primitives/input";
import { ScrollArea } from "@/shared/components/primitives/scroll-area";
import { Separator } from "@/shared/components/primitives/separator";
import data from "@/shared/data/justdial_with_icons.json";
import * as TablerIcons from "@tabler/icons-react";
import { useMemo, useState } from "react";

type Service = {
    name: string;
    description: string;
    icon: string;
    category: string;
    categoryId: string;
    subCategory: string;
};

function getIcon(name: string, size = 18) {
    const Icon =
        (TablerIcons as Record<string, any>)[name] || TablerIcons.IconCategory;
    return <Icon size={size} />;
}

function ServiceCard({ service }: { service: Service }) {
    return (
        <div className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/50 hover:bg-accent/50">
            {/* Icon */}
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                {getIcon(service.icon, 17)}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-1.5">
                <p className="text-sm font-semibold leading-tight text-card-foreground">
                    {service.name}
                </p>
                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {service.description}
                </p>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary ring-1 ring-inset ring-primary/20">
                    {service.subCategory}
                </span>
            </div>
        </div>
    );
}

export default function CategoriesBrowser() {
    const [search, setSearch] = useState("");
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
        null,
    );
    const [activeSubCategory, setActiveSubCategory] = useState<string | null>(
        null,
    );

    const categories = data.categories as any[];

    const allServices: Service[] = useMemo(
        () =>
            categories.flatMap((cat) =>
                cat.sub_categories.flatMap((sub: any) =>
                    sub.services.map((svc: any) => ({
                        ...svc,
                        category: cat.name,
                        categoryId: cat.id,
                        subCategory: sub.name,
                    })),
                ),
            ),
        [categories],
    );

    const activeCategory = useMemo(
        () => categories.find((c) => c.id === activeCategoryId) ?? null,
        [activeCategoryId, categories],
    );

    const subCategories: string[] = useMemo(
        () => activeCategory?.sub_categories.map((s: any) => s.name) ?? [],
        [activeCategory],
    );

    const filteredServices = useMemo(() => {
        let pool = allServices;
        if (activeCategoryId)
            pool = pool.filter((s) => s.categoryId === activeCategoryId);
        if (activeSubCategory)
            pool = pool.filter((s) => s.subCategory === activeSubCategory);
        if (search.trim()) {
            const q = search.toLowerCase();
            pool = pool.filter((s) =>
                [s.name, s.description, s.category, s.subCategory]
                    .join(" ")
                    .toLowerCase()
                    .includes(q),
            );
        }
        return pool;
    }, [allServices, activeCategoryId, activeSubCategory, search]);

    function handleCategoryClick(id: string) {
        if (activeCategoryId === id) {
            setActiveCategoryId(null);
            setActiveSubCategory(null);
        } else {
            setActiveCategoryId(id);
            setActiveSubCategory(null);
        }
    }

    function handleSubCategoryClick(name: string) {
        setActiveSubCategory(activeSubCategory === name ? null : name);
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground">
            {/* ── Sidebar ─────────────────────────────────── */}
            <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-card/50">
                {/* Logo */}
                <div className="flex items-center gap-2.5 px-5 py-5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <TablerIcons.IconLayoutGrid size={14} />
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-card-foreground">
                        Service Directory
                    </span>
                </div>

                <Separator className="bg-border" />

                <ScrollArea className="flex-1 py-3">
                    {/* All Services */}
                    <button
                        onClick={() => {
                            setActiveCategoryId(null);
                            setActiveSubCategory(null);
                        }}
                        className={`mx-2 mb-1 flex w-[calc(100%-16px)] items-center gap-3 rounded-lg px-4 py-2 text-left transition-colors ${
                            !activeCategoryId ? "bg-primary/10" : (
                                "hover:bg-muted/50"
                            )
                        }`}
                    >
                        <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                                !activeCategoryId ?
                                    "bg-primary/20 text-primary"
                                :   "bg-muted text-muted-foreground"
                            }`}
                        >
                            <TablerIcons.IconLayoutGrid size={14} />
                        </span>
                        <span
                            className={`text-xs font-medium ${
                                !activeCategoryId ? "text-primary" : (
                                    "text-muted-foreground"
                                )
                            }`}
                        >
                            All Services
                        </span>
                        <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                            {allServices.length}
                        </span>
                    </button>

                    <div className="mt-1 px-3">
                        <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                            Categories
                        </p>
                        {categories.map((cat) => {
                            const isActive = activeCategoryId === cat.id;
                            const CatIcon =
                                (TablerIcons as Record<string, any>)[
                                    cat.icon
                                ] || TablerIcons.IconCategory;
                            const count = allServices.filter(
                                (s) => s.categoryId === cat.id,
                            ).length;

                            return (
                                <div key={cat.id}>
                                    <button
                                        onClick={() =>
                                            handleCategoryClick(cat.id)
                                        }
                                        className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-all ${
                                            isActive ? "bg-primary/10" : (
                                                "hover:bg-muted/50"
                                            )
                                        }`}
                                    >
                                        <span
                                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                                                isActive ?
                                                    "bg-primary/20 text-primary"
                                                :   "bg-muted/50 text-muted-foreground"
                                            }`}
                                        >
                                            <CatIcon size={13} />
                                        </span>
                                        <span
                                            className={`flex-1 truncate text-xs ${
                                                isActive ?
                                                    "font-semibold text-primary"
                                                :   "text-muted-foreground"
                                            }`}
                                        >
                                            {cat.name}
                                        </span>
                                        <span className="font-mono text-[9px] text-muted-foreground">
                                            {count}
                                        </span>
                                    </button>

                                    {/* Sub-categories */}
                                    {isActive && subCategories.length > 0 && (
                                        <div className="mb-1 ml-4 border-l border-primary/20 pb-1 pl-3 pt-0.5">
                                            {subCategories.map((sub) => {
                                                const isSub =
                                                    activeSubCategory === sub;
                                                return (
                                                    <button
                                                        key={sub}
                                                        onClick={() =>
                                                            handleSubCategoryClick(
                                                                sub,
                                                            )
                                                        }
                                                        className={`flex w-full items-center gap-2 rounded-md px-2 py-1 text-left transition-colors ${
                                                            isSub ?
                                                                "bg-primary/10"
                                                            :   "hover:bg-muted/50"
                                                        }`}
                                                    >
                                                        {isSub && (
                                                            <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
                                                        )}
                                                        <span
                                                            className={`truncate text-[11px] ${
                                                                isSub ?
                                                                    "font-medium text-primary"
                                                                :   "text-muted-foreground"
                                                            }`}
                                                        >
                                                            {sub}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </aside>

            {/* ── Main content ─────────────────────────────── */}
            <div className="flex min-w-0 flex-1 flex-col">
                {/* Header */}
                <header className="flex shrink-0 items-center gap-4 border-b border-border bg-card/50 px-6 py-4">
                    <div className="flex-1">
                        <div className="relative max-w-md">
                            <TablerIcons.IconSearch
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                            <Input
                                placeholder="Search services, categories…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-9 border-border bg-muted/30 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                            />
                        </div>
                    </div>

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span
                            className="cursor-pointer transition-colors hover:text-foreground"
                            onClick={() => {
                                setActiveCategoryId(null);
                                setActiveSubCategory(null);
                            }}
                        >
                            All
                        </span>
                        {activeCategory && (
                            <>
                                <TablerIcons.IconChevronRight size={12} />
                                <span
                                    className={`cursor-pointer transition-colors ${
                                        activeSubCategory ?
                                            "hover:text-foreground"
                                        :   "text-primary"
                                    }`}
                                    onClick={() => setActiveSubCategory(null)}
                                >
                                    {activeCategory.name}
                                </span>
                            </>
                        )}
                        {activeSubCategory && (
                            <>
                                <TablerIcons.IconChevronRight size={12} />
                                <span className="text-primary">
                                    {activeSubCategory}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Count */}
                    <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
                        <span className="font-mono text-foreground/60">
                            {filteredServices.length}
                        </span>
                        <span>services</span>
                    </div>
                </header>

                {/* Section heading when a category is selected */}
                {activeCategory && !search && (
                    <div className="flex shrink-0 items-center gap-3 border-b border-border bg-primary/5 px-6 py-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                            {getIcon(activeCategory.icon, 16)}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">
                                {activeCategory.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {activeSubCategory ?? "All sub-categories"} ·{" "}
                                {filteredServices.length} services
                            </p>
                        </div>

                        {/* Sub-category pills */}
                        {!activeSubCategory && (
                            <div className="ml-4 flex flex-wrap gap-1.5">
                                {subCategories.slice(0, 6).map((sub) => (
                                    <button
                                        key={sub}
                                        onClick={() =>
                                            handleSubCategoryClick(sub)
                                        }
                                        className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] text-primary transition-all hover:bg-primary/20"
                                    >
                                        {sub}
                                    </button>
                                ))}
                                {subCategories.length > 6 && (
                                    <span className="px-1 text-[11px] text-muted-foreground">
                                        +{subCategories.length - 6} more
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Grid */}
                <div className="flex-1 overflow-scroll">
                    {filteredServices.length === 0 ?
                        <div className="flex h-full flex-col items-center justify-center gap-3 py-24 text-center">
                            <TablerIcons.IconSearchOff
                                size={32}
                                className="text-muted-foreground/50"
                            />
                            <p className="text-sm text-muted-foreground">
                                No services match your search
                            </p>
                            <button
                                className="text-xs text-primary underline underline-offset-2 hover:text-primary/80"
                                onClick={() => {
                                    setSearch("");
                                    setActiveCategoryId(null);
                                    setActiveSubCategory(null);
                                }}
                            >
                                Clear filters
                            </button>
                        </div>
                    :   <div className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {filteredServices.map((service) => (
                                <ServiceCard
                                    key={`${service.categoryId}-${service.subCategory}-${service.name}`}
                                    service={service}
                                />
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
