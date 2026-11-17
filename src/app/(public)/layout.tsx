import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pb-[calc(4rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <Navbar></Navbar>
      {children}
      <Footer />
    </div>
  );
};

export default layout;
