import { check } from "@repo/client";
import { Button } from "@repo/ui/button";
import { NextPage } from "next";
import { client } from "../client";

const Page: NextPage = async () => {
    let { data } = await check({ client });

    return (
        <div>
            <Button appName="Web" healthStatus={data?.status}>
                Helo
            </Button>
        </div>
    );
};

export default Page;
