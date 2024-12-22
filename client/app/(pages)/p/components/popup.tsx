import React from "react";

const SuccessPopup: React.FC<{}> = ({}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
      <div className=" p-6 max-w-sm text-center">
        <img src="/check.png" alt="Success" className="mb-4" />
      </div>
    </div>
  );
};

export default SuccessPopup;
