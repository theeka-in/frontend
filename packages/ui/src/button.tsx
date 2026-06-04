"use client";

import { HealthCheckResponse } from "@repo/client";
import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    className?: string;
    appName: string;
    healthStatus?: HealthCheckResponse["status"];
}

export const Button = ({
    children,
    className,
    appName,
    healthStatus,
}: ButtonProps) => {
    return (
        <div className="">
            <p>{healthStatus}</p>
            <button
                className="bg-amber-500 p-10"
                onClick={() => alert(`Hello from your ${appName} app!`)}
            >
                {children}
            </button>
        </div>
    );
};
