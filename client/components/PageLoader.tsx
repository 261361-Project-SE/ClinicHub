import { Loader2 } from "lucide-react";
import React from "react";

const PageLoader = () => {
  return (
    <div className="inset-0 z-50 flex items-center justify-center w-full min-h-screen">
      <Loader2 className="text-pink-200 animate-spin" size={36} />
    </div>
  );
};

export default PageLoader;
