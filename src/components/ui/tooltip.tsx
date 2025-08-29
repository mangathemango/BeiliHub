import React from "react";

export const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const Tooltip = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const TooltipTrigger = ({ children }: { children: React.ReactNode }) => (
  <button>{children}</button>
);

export const TooltipContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
