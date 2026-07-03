import ProductsPage from "@/features/explore/pages/products";
import { exploreProductListingsNearby } from "@/shared/client";
import { ReactNode } from "react";

const Page = async (): Promise<ReactNode> => {
    const q = "earphone";
    const { data } = await exploreProductListingsNearby({
        query: {
            query: q,
            latitude: 30.733729951515837,
            longitude: 76.75320035056701,
        },
    });

    return (
        <ProductsPage
            userLat={30.733729951515837}
            userLon={76.75320035056701}
            products={data!}
            isError={!data}
            searchQuery={q}
            onSearchQueryChange={async () => {
                "use server";
                console.log("hello");
            }}
        />
    );
};

export default Page;
