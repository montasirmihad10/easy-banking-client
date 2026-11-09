"use client";
import { useState } from "react";
import Banner from "./homePages/Banner";
import Delivery from "./homePages/Delivery";
import FAQ from "./homePages/FAQ";
import InterestCalculator from "./homePages/InterestCalculator";
import LoanCalculator from "./homePages/LoanCalculator";
import SliderPart from "./homePages/SliderPart";

const Home = () => {
  const [activeTab, setActiveTab] = useState("loan");

  return (
    <div className="bg-gradient-to-br from-slate-50/50 via-white/30 to-slate-100/50">
      <Banner />
      <SliderPart />
      <Delivery />

      {/* Tab System for Calculator */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center mb-4">
          <button
            className={`px-6 py-2 rounded-l-lg border transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#104042] hover:bg-[#104042]/90 hover:text-white cursor-pointer ${
              activeTab === "loan"
                ? "bg-[#104042] text-white"
                : "bg-white text-[#104042] border-[#104042]"
            }`}
            onClick={() => setActiveTab("loan")}
          >
            Loan Calculator
          </button>
          <button
            className={`px-6 py-2 rounded-r-lg border transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#104042] hover:bg-[#104042]/90 hover:text-white cursor-pointer ${
              activeTab === "interest"
                ? "bg-[#104042] text-white"
                : "bg-white text-[#104042] border-[#104042]"
            }`}
            onClick={() => setActiveTab("interest")}
          >
            Interest Calculator
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          {activeTab === "loan" ? <LoanCalculator /> : <InterestCalculator />}
        </div>
      </div>

      <FAQ />
    </div>
  );
};

export default Home;
