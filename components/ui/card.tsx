"use client";
import React from "react";

export function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`rounded-xl shadow-md p-4 bg-zinc-900 text-white font-bold ${className || ""}`}>
      {children}
    </div>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-2">
      {children}
    </div>
  );
}