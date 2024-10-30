import React, { useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

const GeneralInformation = ({ setRefs }) => {
  const productNameRef = useRef("");
  const productDescriptionRef = useRef("");

  useEffect(() => {
    setRefs({
      productNameRef,
      productDescriptionRef,
    });
  }, [setRefs]);

  return (
    <div className="grid w-full p-5 rounded-lg bg-[#fff] border border-gray-300 shadow-sm items-center gap-4">
      <div>General Information</div>

      {/* Product Name */}
      <div>
        <span className="opacity-[.7] text-sm">Product Name</span>
        <input
          id="productName"
          name="productName"
          type="text"
          ref={productNameRef} // Use ref instead of value/onChange
          className="border border-gray-300 text-gray-600 bg-[#fff] shadow-sm rounded-lg p-2 w-full focus:outline-none"
          required
        />
      </div>

      {/* Product Description */}
      <div className="flex flex-col w-full">
        <label htmlFor="productDescription" className="opacity-70 text-sm mb-1">
          Product Description
        </label>
        <Textarea
          id="productDescription"
          name="productDescription"
          ref={productDescriptionRef} // Use ref instead of value/onChange
          className="border border-gray-300 text-gray-600 bg-[#fff] shadow-sm rounded-lg p-3 w-full h-24 overflow-y-auto focus:outline-none"
          style={{ resize: "none" }}
        />
      </div>
    </div>
  );
};

export default GeneralInformation;
