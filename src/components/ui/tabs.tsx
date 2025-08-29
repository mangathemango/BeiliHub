import React from "react";

export const Tabs = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export const TabsList = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export const TabsTrigger = ({ children }: { children: React.ReactNode }) => (
  <button>{children}</button>
);

export const TabsContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
