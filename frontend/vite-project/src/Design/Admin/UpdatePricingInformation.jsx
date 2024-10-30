import React from "react";

const UpdatePricingInformation = ({ basePriceRef, discountPercentageRef }) => {
  return (
    <div className="grid w-full p-5 rounded-lg bg-[#fff] border border-gray-300 shadow-sm items-center gap-4">
      <div>Pricing Information</div>

      {/* Base Price */}
      <div className="flex flex-col w-full">
        <label htmlFor="basePrice" className="opacity-70 text-sm mb-1">
          Base Price
        </label>
        <input
          id="basePrice"
          name="basePrice"
          type="number"
          ref={basePriceRef}
          className="border border-gray-300 text-gray-600 bg-[#fff] shadow-sm rounded-lg p-2 w-full focus:outline-none"
          required
        />
      </div>

      {/* Discount Percentage */}
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="flex flex-col w-full">
          <label
            htmlFor="discountPercentage"
            className="opacity-70 text-sm mb-1"
          >
            Discount Percentage
          </label>
          <input
            id="discountPercentage"
            name="discountPercentage"
            type="number"
            ref={discountPercentageRef}
            className="border border-gray-300 text-gray-600 bg-[#fff] shadow-sm rounded-lg p-2 w-full focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdatePricingInformation;
