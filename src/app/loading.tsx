"use client";

import { BarLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      className="w-full min-h-screen"
      aria-busy="true"
      role="status"
      id="my-div"
      style={{ display: "none" }}
    >
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Loading data...</h1>
        <BarLoader
          loading={true}
          color="#5eead4"
          cssOverride={{ borderRadius: "10px" }}
          height={10}
          width={210}
        />
      </div>
    </div>
  );
};

export default Loading;
