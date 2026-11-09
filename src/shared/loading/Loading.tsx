"use client";
import { ScaleLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ScaleLoader color="#104042" />
    </div>
  );
};

export default Loading;
