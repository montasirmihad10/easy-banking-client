import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <Navbar></Navbar>
      {children}
      <Footer />
    </div>
  );
};

export default layout;
