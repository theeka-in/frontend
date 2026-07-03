import ServicesPage from "@/features/explore/pages/services";
import { exploreServiceListingsNearby } from "@/shared/client";
import { ReactNode } from "react";

const Page = async (): Promise<ReactNode> => {
    const q = "plumber";
    const { data } = await exploreServiceListingsNearby({
        query: {
            query: q,
            latitude: 30.733729951515837,
            longitude: 76.75320035056701,
        },
    });

    return (
        <ServicesPage
            userLat={30.733729951515837}
            userLon={76.75320035056701}
            services={data!}
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
