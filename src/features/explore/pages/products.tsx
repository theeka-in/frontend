"use client";

import { ExploreProductListingDto } from "@/shared/client";
import { IconLoader2, IconPackageOff } from "@tabler/icons-react";
import { ProductCard } from "../components/product-card";

type ProductsPageProps = {
    products: ExploreProductListingDto[];
    isLoading?: boolean;
    isError?: boolean;
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
    userLat: number;
    userLon: number;
};

const ProductsPage = ({
    products,
    isLoading = false,
    isError = false,
    searchQuery,
    onSearchQueryChange,
    userLat,
    userLon,
}: ProductsPageProps) => {
    return (
        <main className="px-6 py-6">
            <div className="flex items-center justify-between mb-5 gap-4">
                <p className="text-sm text-muted-foreground">
                    {isLoading ?
                        <span className="inline-flex items-center gap-1.5">
                            <IconLoader2 className="w-3.5 h-3.5 animate-spin" />
                            Loading…
                        </span>
                    :   <>
                            <strong className="text-foreground">
                                {products.length}
                            </strong>{" "}
                            results
                            {searchQuery && (
                                <>
                                    {" "}
                                    for "<strong>{searchQuery}</strong>"
                                </>
                            )}
                        </>
                    }
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {isLoading ?
                    <div className="col-span-full text-center py-20 text-muted-foreground">
                        <IconLoader2 className="w-10 h-10 mx-auto mb-4 opacity-40 animate-spin" />
                        <p className="text-sm">Loading products…</p>
                    </div>
                : isError ?
                    <div className="col-span-full text-center py-20 text-destructive">
                        <p className="text-sm font-medium">
                            Failed to load products.
                        </p>
                    </div>
                : products.length === 0 ?
                    <div className="col-span-full text-center py-20 text-muted-foreground">
                        <IconPackageOff className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <h3 className="text-foreground text-lg font-semibold mb-1">
                            No products found
                        </h3>
                        <p className="text-sm">
                            Try adjusting your filters or search query.
                        </p>
                    </div>
                :   products.map((p) => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            userLat={userLat}
                            userLon={userLon}
                        />
                    ))
                }
            </div>

            {/* {products > 1 && (
                            <div className="mt-10">
                                <Pagination
                                    page={page}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                />
                            </div>
                        )} */}
        </main>
    );
};

export default ProductsPage;
