import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
    input: "https://raw.githubusercontent.com/theeka-in/api-spec/refs/heads/main/openapi.json",
    output: "src/shared/client/generated",
    plugins: ["@hey-api/client-fetch", "@tanstack/react-query"],
});
