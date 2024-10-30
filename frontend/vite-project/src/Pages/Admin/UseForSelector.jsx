// src/components/UseForSelector.js
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const UseForSelector = ({
  useFor,
  gender,
  ageGroup,
  handleUseForChange,
  handleGenderChange,
  handleAgeGroupChange,
}) => {
  return (
    <div className="grid w-full gap-4 p-5 rounded-lg bg-[#fff] border border-gray-300 shadow-sm">
      {/* Use For Select */}
      <div className="flex flex-col w-full">
        <label htmlFor="useFor" className="opacity-70 text-sm mb-1">
          Use For
        </label>
        <Select onValueChange={handleUseForChange} value={useFor}>
          <SelectTrigger className="w-full border border-gray-300 bg-[#fff] rounded-lg p-2">
            <SelectValue placeholder="Select Use For" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="training">Training</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Gender Select */}
      <div className="flex flex-col w-full">
        <label htmlFor="gender" className="opacity-70 text-sm mb-1">
          Gender
        </label>
        <Select onValueChange={handleGenderChange} value={gender}>
          <SelectTrigger className="w-full border border-gray-300 bg-[#fff] rounded-lg p-2">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="unisex">Unisex</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Age Group Select */}
      <div className="flex flex-col w-full">
        <label htmlFor="ageGroup" className="opacity-70 text-sm mb-1">
          Age Group
        </label>
        <Select onValueChange={handleAgeGroupChange} value={ageGroup}>
          <SelectTrigger className="w-full border border-gray-300 bg-[#fff] rounded-lg p-2">
            <SelectValue placeholder="Select Age Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="adult">Adult</SelectItem>
            <SelectItem value="kid">Kid</SelectItem>
            <SelectItem value="boy">Boy</SelectItem>
            <SelectItem value="girl">Girl</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UseForSelector;
