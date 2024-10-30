import React, { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";

const UpdateGeneralInformation = ({ nameRef, descriptionRef }) => {
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
          defaultValue=""
          ref={nameRef}
          className="border text-sm border-gray-300 text-gray-600 bg-[#fff] shadow-sm rounded-lg p-2 w-full focus:outline-none"
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
          defaultValue=""
          ref={descriptionRef}
          className="border border-gray-300 text-gray-600 bg-[#fff] shadow-sm rounded-lg p-3 w-full h-24 overflow-y-auto focus:outline-none"
          style={{ resize: "none" }}
        />
      </div>
    </div>
  );
};

export default UpdateGeneralInformation;
