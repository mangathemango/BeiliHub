import React from "react";

export const Popover = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export const PopoverTrigger = ({ children }: { children: React.ReactNode }) => (
  <button>{children}</button>
);

export const PopoverContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
