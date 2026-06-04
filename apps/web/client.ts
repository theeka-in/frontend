import { createClient } from "@repo/client";
import { Client } from "@repo/client/generated/client/index";

if (!process.env.NEXT_PUBLIC_URL) {
    throw new Error("There is no NEXT_PUBLIC_URL");
}

export const client = createClient({
    baseUrl: process.env.NEXT_PUBLIC_URL,
}) as Client;
