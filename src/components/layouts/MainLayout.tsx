import type { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-full min-h-screen flex-col bg-slate-100">
      <header className="bg-orange-600">header goes here!</header>
      <main className="flex-1">{children}</main>
      <footer>footer goes here!</footer>
    </div>
  );
};

export default MainLayout;
