import React from "react";

export default function AuthLayout({children}: {
    readonly children: React.ReactNode;
}) {
    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            {children}
        </div>
    )
}